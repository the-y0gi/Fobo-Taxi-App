// controllers/authController.js
const User = require('../models/User');
const Driver = require('../models/Driver');
const Admin = require('../models/Admin');
const { generateToken  } = require('../utils/jwt');
const { hashPassword, comparePassword } = require('../utils/password');

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ 
      $or: [{ email }, { phone }] 
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or phone'
      });
    }

    const hashedPassword = await hashPassword(password);
    
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword
    });

    await user.save();

    const tokens = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone
        },
        tokens
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const registerDriver = async (req, res) => {
  try {
    const { name, email, phone, password, address, vehicle } = req.body;

    const existingDriver = await Driver.findOne({ 
      $or: [{ email }, { phone }] 
    });

    if (existingDriver) {
      return res.status(400).json({
        success: false,
        message: 'Driver already exists with this email or phone'
      });
    }
//generate driver id
    const employeeId = `DRIVER-${Date.now()}${Math.floor(Math.random() * 1000)}`;

    const hashedPassword = await hashPassword(password);
    
    const driver = new Driver({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
      vehicle,
      employeeId,
      isApproved: false 
    });

    await driver.save();

    const tokens = generateToken({ ...driver.toObject(), role: 'driver' });

    res.status(201).json({
      success: true,
      message: 'Driver registered successfully. Waiting for admin approval.',
      data: {
        driver: {
          id: driver._id,
          name: driver.name,
          email: driver.email,
          phone: driver.phone,
          employeeId: driver.employeeId,
          isApproved: driver.isApproved
        },
        tokens
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, userType = 'user' } = req.body;

    let user;
    
    if (userType === 'driver') {
      user = await Driver.findOne({ email });
    } else if (userType === 'admin') {
      user = await Admin.findOne({ email });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    if (userType === 'driver' && !user.isApproved) {
      return res.status(400).json({
        success: false,
        message: 'Your account is pending admin approval'
      });
    }

    const tokens = generateToken({ 
      ...user.toObject(), 
      role: userType 
    });

    const userResponse = { ...user.toObject() };
    delete userResponse.password;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        tokens
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = req.user;
    
    const userResponse = { ...user.toObject() };
    delete userResponse.password;

    res.json({
      success: true,
      data: { user: userResponse }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// const refreshToken = async (req, res) => {
//   try {
//     const { refreshToken } = req.body;

//     if (!refreshToken) {
//       return res.status(400).json({
//         success: false,
//         message: 'Refresh token is required'
//       });
//     }

//     const decoded = require('../utils/jwt').verifyToken(refreshToken);
    
//     let user;
//     if (decoded.role === 'driver') {
//       user = await Driver.findById(decoded.id);
//     } else if (decoded.role === 'admin') {
//       user = await Admin.findById(decoded.id);
//     } else {
//       user = await User.findById(decoded.id);
//     }

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid refresh token'
//       });
//     }

//     const tokens = generateAuthTokens(user);

//     res.json({
//       success: true,
//       data: { tokens }
//     });
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: 'Invalid refresh token'
//     });
//   }
// };

module.exports = {
  registerUser,
  registerDriver,
  login,
  getMe,
};