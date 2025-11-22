const Ride = require('../../models/Ride');
const User = require('../../models/User');
const Driver = require('../../models/Driver');
const Payment = require('../../models/Payment');

exports.getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Parallel queries for today's data
    const [
      totalRidesToday,
      completedRidesToday,
      cancelledRidesToday,
      activeDriversCount,
      offlineDriversCount,
      todayRevenue,
      refundRequestsCount
    ] = await Promise.all([
      // Total Rides Today
      Ride.countDocuments({ 
        createdAt: { $gte: today, $lt: tomorrow } 
      }),
      
      // Completed Rides Today
      Ride.countDocuments({ 
        createdAt: { $gte: today, $lt: tomorrow },
        status: 'completed'
      }),
      
      // Cancelled Rides Today
      Ride.countDocuments({ 
        createdAt: { $gte: today, $lt: tomorrow },
        status: 'cancelled'
      }),
      
      // Active Drivers (online, arriving, on-ride)
      Driver.countDocuments({ 
        isApproved: true,
        status: { $in: ['online', 'arriving', 'on-ride'] }
      }),
      
      // Offline Drivers
      Driver.countDocuments({ 
        isApproved: true,
        status: 'offline'
      }),
      
      // Today's Revenue
      Ride.aggregate([
        { 
          $match: { 
            createdAt: { $gte: today, $lt: tomorrow },
            status: 'completed'
          } 
        },
        { 
          $group: { 
            _id: null, 
            total: { $sum: '$totalFare' } 
          } 
        }
      ]),
      
      // Refund Requests
      Payment.countDocuments({
        refundStatus: 'requested'
      })
    ]);

    const todayRevenueAmount = todayRevenue[0]?.total || 0;

    res.json({
      success: true,
      data: {
        totalRidesToday,
        completedRidesToday, 
        cancelledRidesToday,
        activeDriversCount,
        offlineDriversCount,
        todayRevenue: todayRevenueAmount,
        refundRequestsCount
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics'
    });
  }
};

exports.getRidesPerHour = async (req, res) => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const ridesPerHour = await Ride.aggregate([
      {
        $match: {
          createdAt: { $gte: yesterday }
        }
      },
      {
        $group: {
          _id: {
            hour: { $hour: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.hour': 1 }
      }
    ]);

    // Format hours for frontend (6 AM, 8 AM, etc.)
    const hourLabels = {
      6: '6 AM', 7: '7 AM', 8: '8 AM', 9: '9 AM', 10: '10 AM',
      11: '11 AM', 12: '12 PM', 13: '1 PM', 14: '2 PM', 15: '3 PM',
      16: '4 PM', 17: '5 PM', 18: '6 PM', 19: '7 PM', 20: '8 PM'
    };

    const formattedData = Array.from({ length: 15 }, (_, i) => {
      const hour = i + 6; // From 6 AM to 8 PM
      const hourData = ridesPerHour.find(item => item._id.hour === hour);
      
      return {
        hour: hourLabels[hour] || `${hour % 12 || 12} ${hour < 12 ? 'AM' : 'PM'}`,
        rides: hourData ? hourData.count : 0
      };
    });

    res.json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    console.error('Rides per hour error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching rides data'
    });
  }
};

exports.getRevenueMetrics = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const revenueData = await Payment.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          $or: [
            { status: 'success' },
            { refundStatus: { $in: ['processed', 'requested'] } }
          ]
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            day: { $dayOfWeek: '$createdAt' }
          },
          revenue: {
            $sum: {
              $cond: [
                { $eq: ['$status', 'success'] },
                '$amount',
                0
              ]
            }
          },
          refunds: {
            $sum: {
              $cond: [
                { $in: ['$refundStatus', ['processed', 'requested']] },
                '$refundAmount',
                0
              ]
            }
          }
        }
      },
      {
        $sort: { '_id.date': 1 }
      }
    ]);

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const formattedData = revenueData.map(item => ({
      day: dayNames[item._id.day - 1],
      revenue: item.revenue,
      refunds: item.refunds
    }));

    res.json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    console.error('Revenue metrics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching revenue metrics'
    });
  }
};

exports.getRecentTrips = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const recentTrips = await Ride.find()
      .populate('user', 'name')
      .populate('driver', 'name')
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('_id user driver totalFare status createdAt');

    const formattedTrips = recentTrips.map(trip => {
      // Format date as "2 hours ago", "1 day ago", etc.
      const timeAgo = getTimeAgo(trip.createdAt);
      
      return {
        id: `TRIP_${trip._id.toString().slice(-6).toUpperCase()}`,
        user: trip.user?.name || 'Unknown User',
        driver: trip.driver?.name || 'No Driver',
        amount: `₹${trip.totalFare}`,
        status: trip.status,
        date: timeAgo
      };
    });

    res.json({
      success: true,
      data: formattedTrips
    });
  } catch (error) {
    console.error('Recent trips error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent trips'
    });
  }
};

// Helper function for time formatting
const getTimeAgo = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};