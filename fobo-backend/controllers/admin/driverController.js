const Driver = require('../../models/Driver');
const Ride = require('../../models/Ride');
const DriverTracking = require('../../models/DriverTracking');

// Get-> all drivers with search and filters
exports.getAllDrivers = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;
    
    const filter = { isApproved: true };
    
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { 'vehicle.carNumber': { $regex: search, $options: 'i' } },
        { employeeId: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    
    const [drivers, totalCount] = await Promise.all([
      Driver.find(filter)
        .select('name phone email employeeId profilePhoto status isActive vehicle currentLocation totalTrips totalEarnings rating')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      
      Driver.countDocuments(filter)
    ]);

    const formattedDrivers = drivers.map(driver => ({
      id: driver._id,
      name: driver.name,
      phone: driver.phone,
      email: driver.email,
      employeeId: driver.employeeId,
      profileImage: driver.profilePhoto,
      status: driver.status,
      isDisabled: !driver.isActive,
      vehicle: {
        name: driver.vehicle.carName,
        model: driver.vehicle.carModel,
        numberPlate: driver.vehicle.carNumber,
        type: driver.vehicle.carType,
        color: driver.vehicle.carColor
      },
      currentLocation: driver.currentLocation.address || 'Location not available',
      stats: {
        totalTrips: driver.totalTrips,
        totalHours: Math.floor(driver.totalTrips * 0.5), // change in future , add the filed in future
        totalEarnings: driver.totalEarnings,
        cancellationRate: driver.cancellationRate,
        rating: driver.rating
      }
    }));

    res.json({
      success: true,
      data: {
        drivers: formattedDrivers,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalCount,
          pages: Math.ceil(totalCount / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get drivers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching drivers'
    });
  }
};

// Get->driver statistics
exports.getDriverStats = async (req, res) => {
  try {
    const [online, offline, onRide, disabled] = await Promise.all([
      Driver.countDocuments({ status: 'online', isActive: true }),
      Driver.countDocuments({ status: 'offline', isActive: true }),
      Driver.countDocuments({ status: 'on-ride', isActive: true }),
      Driver.countDocuments({ isActive: false })
    ]);

    res.json({
      success: true,
      data: {
        online,
        offline, 
        onRide,
        disabled
      }
    });
  } catch (error) {
    console.error('Driver stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching driver statistics'
    });
  }
};

//GET->single driver details
exports.getDriverById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const [todayTrips, todayEarnings, trackingData] = await Promise.all([
      // Today's trips count
      Ride.countDocuments({
        driver: id,
        status: 'completed',
        createdAt: { $gte: today }
      }),
      
      // Today's earnings
      Ride.aggregate([
        {
          $match: {
            driver: mongoose.Types.ObjectId(id),
            status: 'completed',
            createdAt: { $gte: today }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$totalFare' }
          }
        }
      ]),
      
      // Today's tracking data
      DriverTracking.findOne({
        driver: id,
        date: { $gte: today }
      })
    ]);

    const todayEarningsAmount = todayEarnings[0]?.total || 0;

    const driverData = {
      id: driver._id,
      name: driver.name,
      phone: driver.phone,
      email: driver.email,
      employeeId: driver.employeeId,
      profileImage: driver.profilePhoto,
      status: driver.status,
      isActive: driver.isActive,
      
      documents: {
        drivingLicence: driver.documents.drivingLicense,
        rcBook: driver.documents.rcBook,
        aadhaar: driver.documents.aadhaar,
        panCard: driver.documents.panCard,
        insurance: driver.documents.insurance,
        vehicleRC: driver.documents.vehicleRC
      },
      
      vehicle: {
        name: driver.vehicle.carName,
        model: driver.vehicle.carModel,
        numberPlate: driver.vehicle.carNumber,
        type: driver.vehicle.carType,
        color: driver.vehicle.carColor
      },
      
      stats: {
        totalTrips: driver.totalTrips,
        totalHours: Math.floor(driver.totalTrips * 0.5), 
        totalEarnings: driver.totalEarnings,
        todayTrips,
        todayEarnings: todayEarningsAmount,
        cancellationRate: driver.cancellationRate,
        rating: driver.rating
      },
      
      //check this part in future
      workingToday: {
        activeTime: trackingData?.onlineTime ? `${Math.floor(trackingData.onlineTime / 60)}h ${trackingData.onlineTime % 60}m` : '0h 0m',
        rideTime: trackingData?.onRideTime ? `${Math.floor(trackingData.onRideTime / 60)}h ${trackingData.onRideTime % 60}m` : '0h 0m',
        breakTime: trackingData?.breakTime ? `${Math.floor(trackingData.breakTime / 60)}h ${trackingData.breakTime % 60}m` : '0h 0m'
      }
    };

    res.json({
      success: true,
      data: driverData
    });
  } catch (error) {
    console.error('Get driver error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching driver details'
    });
  }
};

//Get-> driver trips
exports.getDriverTrips = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const skip = (page - 1) * limit;
    
    const trips = await Ride.find({ driver: id })
      .populate('user', 'name phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('_id pickupLocation dropLocation distance estimatedTime totalFare status createdAt');

    const formattedTrips = trips.map(trip => ({
      id: trip._id,
      tripId: `TRIP_${trip._id.toString().slice(-6).toUpperCase()}`,
      userName: trip.user?.name || 'Unknown User',
      userPhone: trip.user?.phone || 'N/A',
      pickup: trip.pickupLocation.address,
      drop: trip.dropLocation.address,
      distanceKm: trip.distance,
      durationMinutes: trip.estimatedTime,
      amount: trip.totalFare,
      date: trip.createdAt
    }));

    const totalCount = await Ride.countDocuments({ driver: id });

    res.json({
      success: true,
      data: {
        trips: formattedTrips,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalCount,
          pages: Math.ceil(totalCount / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get driver trips error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching driver trips'
    });
  }
};

//POST->Create driver
exports.createDriver = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      address,
      employeeId,
      vehicle
    } = req.body;

    const existingDriver = await Driver.findOne({
      $or: [{ email }, { phone }, { employeeId }]
    });

    if (existingDriver) {
      return res.status(400).json({
        success: false,
        message: 'Driver with same email, phone or employee ID already exists'
      });
    }

    // Generate default password
    const defaultPassword = 'driver123';

    const newDriver = new Driver({
      name,
      phone,
      email,
      address,
      employeeId,
      password: defaultPassword, //THIS IS plan password
      vehicle: {
        carName: vehicle.name,
        carModel: vehicle.model,
        carNumber: vehicle.numberPlate,
        carType: vehicle.type,
        carColor: vehicle.color
      },
      isApproved: true
    });

    await newDriver.save();

    res.status(201).json({
      success: true,
      message: 'Driver created successfully',
      data: {
        id: newDriver._id
      }
    });
  } catch (error) {
    console.error('Create driver error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating driver'
    });
  }
};

//GET->Update driver status (enable/disable)
exports.updateDriverStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const driver = await Driver.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    res.json({
      success: true,
      message: `Driver ${isActive ? 'enabled' : 'disabled'} successfully`,
      data: {
        isActive: driver.isActive
      }
    });
  } catch (error) {
    console.error('Update driver status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating driver status'
    });
  }
};


//upload documents section also add the cloudinary part
exports.uploadDocuments = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {};
    
    const fieldMapping = {
      license: 'drivingLicense',
      rc: 'rcBook',
      insurance: 'insurance',
      aadhaar: 'aadhaar',
      profilePhoto: 'profilePhoto',
      carPhoto: 'carPhoto'
    };

    for (const [frontendField, backendField] of Object.entries(fieldMapping)) {
      if (req.files && req.files[frontendField]) {
        updateData[`documents.${backendField}`] = `/uploads/${req.files[frontendField][0].filename}`;
      }
    }

    const driver = await Driver.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    res.json({
      success: true,
      message: 'Documents uploaded successfully',
      data: driver
    });
  } catch (error) {
    console.error('Upload documents error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading documents'
    });
  }
};

