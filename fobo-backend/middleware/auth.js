const { verifyToken } = require('../utils/jwt');
const User = require('../models/User');
const Driver = require('../models/Driver');
const Admin = require('../models/Admin');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = verifyToken(token);
    
    let user;
    if (decoded.role === 'driver') {
      user = await Driver.findById(decoded.id).select('-password');
    } else if (decoded.role === 'admin') {
      user = await Admin.findById(decoded.id).select('-password');
    } else {
      user = await User.findById(decoded.id).select('-password');
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token is valid but user not found'
      });
    }

    req.user = user;
    req.user.role = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.'
      });
    }
    next();
  };
};

// const optionalAuth = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
    
//     if (token) {
//       const decoded = verifyToken(token);
      
//       let user;
//       if (decoded.role === 'driver') {
//         user = await Driver.findById(decoded.id).select('-password');
//       } else if (decoded.role === 'admin') {
//         user = await Admin.findById(decoded.id).select('-password');
//       } else {
//         user = await User.findById(decoded.id).select('-password');
//       }

//       if (user) {
//         req.user = user;
//         req.user.role = decoded.role;
//       }
//     }
//     next();
//   } catch (error) {
//     next();
//   }
// };

module.exports = {
  auth,
  requireRole,
};