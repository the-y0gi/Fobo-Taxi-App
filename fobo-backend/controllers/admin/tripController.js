const Driver = require('../../models/Driver');
const Ride = require('../../models/Ride');
const DriverTracking = require('../../models/DriverTracking');
const User = require('../../models/User');

// GET->Daily View - Driver-wise today's trips
exports.getDailyTrips = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get all active drivers
    const drivers = await Driver.find({ isActive: true, isApproved: true })
      .select('name phone employeeId profilePhoto status vehicle workingToday');

    //today's trips for all drivers
    const dailyTrips = await Ride.find({
      createdAt: { $gte: today, $lt: tomorrow },
      status: 'completed'
    })
    .populate('user', 'name phone')
    .populate('driver', 'name')
    .select('driver user pickupLocation dropLocation distance estimatedTime totalFare razorpayOrderId createdAt');

    //today's tracking data
    const todayTracking = await DriverTracking.find({
      date: { $gte: today }
    });

    const driversWithTrips = drivers.map(driver => {
      const driverTrips = dailyTrips.filter(trip => 
        trip.driver && trip.driver._id.toString() === driver._id.toString()
      );
      
      const driverTracking = todayTracking.find(track => 
        track.driver.toString() === driver._id.toString()
      );

      const totalEarnings = driverTrips.reduce((sum, trip) => sum + trip.totalFare, 0);

      const formattedTrips = driverTrips.map(trip => ({
        id: trip._id,
        tripId: `TRIP_${trip._id.toString().slice(-6).toUpperCase()}`,
        userName: trip.user?.name || 'Unknown User',
        userPhone: trip.user?.phone || 'N/A',
        pickup: trip.pickupLocation.address,
        drop: trip.dropLocation.address,
        distanceKm: trip.distance,
        durationMinutes: trip.estimatedTime,
        amount: trip.totalFare,
        paymentId: trip.razorpayOrderId || 'N/A'
      }));

      return {
        id: driver._id,
        name: driver.name,
        phone: driver.phone,
        employeeId: driver.employeeId,
        profileImage: driver.profilePhoto,
        status: driver.status,
        vehicle: {
          name: driver.vehicle.carName,
          model: driver.vehicle.carModel,
          numberPlate: driver.vehicle.carNumber
        },
        trips: formattedTrips,

        //working this part in future
        workingToday: {
          activeTime: driverTracking ? 
            `${Math.floor(driverTracking.onlineTime / 60)}h ${driverTracking.onlineTime % 60}m` : 
            driver.workingToday.activeTime,
          rideTime: driverTracking ? 
            `${Math.floor(driverTracking.onRideTime / 60)}h ${driverTracking.onRideTime % 60}m` : 
            driver.workingToday.rideTime,
          breakTime: driverTracking ? 
            `${Math.floor(driverTracking.breakTime / 60)}h ${driverTracking.breakTime % 60}m` : 
            driver.workingToday.breakTime
        },
        totalEarnings
      };
    });

    res.json({
      success: true,
      data: driversWithTrips
    });
  } catch (error) {
    console.error('Daily trips error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching daily trips'
    });
  }
};

//GET->  Weekly Performance
exports.getWeeklyPerformance = async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const weeklyData = await Driver.aggregate([
      {
        $match: { isActive: true, isApproved: true }
      },
      {
        $lookup: {
          from: 'rides',
          let: { driverId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$driver', '$$driverId'] },
                status: 'completed',
                createdAt: { $gte: oneWeekAgo }
              }
            },
            {
              $group: {
                _id: '$driver',
                weeklyTrips: { $sum: 1 },
                weeklyEarnings: { $sum: '$totalFare' }
              }
            }
          ],
          as: 'weeklyRides'
        }
      },
      {
        $lookup: {
          from: 'drivertrackings',
          let: { driverId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$driver', '$$driverId'] },
                date: { $gte: oneWeekAgo }
              }
            },
            {
              $group: {
                _id: '$driver',
                totalOnlineTime: { $sum: '$onlineTime' },
                totalOnRideTime: { $sum: '$onRideTime' }
              }
            }
          ],
          as: 'weeklyTracking'
        }
      },
      {
        $project: {
          name: 1,
          employeeId: 1,
          profilePhoto: 1,
          cancellationRate: 1,
          weeklyTrips: { $arrayElemAt: ['$weeklyRides.weeklyTrips', 0] },
          weeklyEarnings: { $arrayElemAt: ['$weeklyRides.weeklyEarnings', 0] },
          weeklyHours: { 
            $divide: [
              { $arrayElemAt: ['$weeklyTracking.totalOnlineTime', 0] }, 
              60 
            ] 
          }
        }
      }
    ]);

    const formattedData = weeklyData.map(driver => ({
      id: driver._id,
      name: driver.name,
      employeeId: driver.employeeId,
      profileImage: driver.profilePhoto,
      weeklyTrips: driver.weeklyTrips || 0,
      weeklyHours: (driver.weeklyHours || 0).toFixed(1),
      weeklyRevenue: driver.weeklyEarnings || 0,
      cancellationRate: driver.cancellationRate || 0
    }));

    res.json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    console.error('Weekly performance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching weekly performance'
    });
  }
};

// GET->Monthly Performance
exports.getMonthlyPerformance = async (req, res) => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const monthlyData = await Driver.aggregate([
      {
        $match: { isActive: true, isApproved: true }
      },
      {
        $lookup: {
          from: 'rides',
          let: { driverId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$driver', '$$driverId'] },
                status: 'completed',
                createdAt: { $gte: oneMonthAgo }
              }
            },
            {
              $group: {
                _id: '$driver',
                monthlyTrips: { $sum: 1 },
                monthlyEarnings: { $sum: '$totalFare' }
              }
            }
          ],
          as: 'monthlyRides'
        }
      },
      {
        $lookup: {
          from: 'drivertrackings',
          let: { driverId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$driver', '$$driverId'] },
                date: { $gte: oneMonthAgo }
              }
            },
            {
              $group: {
                _id: '$driver',
                totalOnlineTime: { $sum: '$onlineTime' },
                cancelledTrips: { $sum: '$cancelledTrips' }
              }
            }
          ],
          as: 'monthlyTracking'
        }
      },
      {
        $project: {
          name: 1,
          employeeId: 1,
          profilePhoto: 1,
          rating: 1,
          monthlyTrips: { $arrayElemAt: ['$monthlyRides.monthlyTrips', 0] },
          monthlyEarnings: { $arrayElemAt: ['$monthlyRides.monthlyEarnings', 0] },
          monthlyHours: { 
            $divide: [
              { $arrayElemAt: ['$monthlyTracking.totalOnlineTime', 0] }, 
              60 
            ] 
          },
          refundCount: { $arrayElemAt: ['$monthlyTracking.cancelledTrips', 0] }
        }
      }
    ]);

    const formattedData = monthlyData.map(driver => ({
      id: driver._id,
      name: driver.name,
      employeeId: driver.employeeId,
      profileImage: driver.profilePhoto,
      monthlyTrips: driver.monthlyTrips || 0,
      monthlyHours: Math.round(driver.monthlyHours || 0),
      monthlyEarnings: driver.monthlyEarnings || 0,
      refundCount: driver.refundCount || 0,
      rating: driver.rating || 4.8
    }));

    res.json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    console.error('Monthly performance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching monthly performance'
    });
  }
};

