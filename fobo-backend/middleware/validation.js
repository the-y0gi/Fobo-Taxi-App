const validator = require('validator');

const validateEmail = (email) => {
  if (!email || !validator.isEmail(email)) {
    throw new Error('Valid email is required');
  }
};

const validatePhone = (phone) => {
  if (!phone || phone.length < 10) {
    throw new Error('Valid phone number is required');
  }
};

const validatePassword = (password) => {
  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }
};

const validateUserRegistration = (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }

    validateEmail(email);
    validatePhone(phone);
    validatePassword(password);

    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const validateDriverRegistration = (req, res, next) => {
  try {
    const { name, email, phone, password, address, vehicle } = req.body;

    if (!name || name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }

    validateEmail(email);
    validatePhone(phone);
    validatePassword(password);

    if (!address || address.trim().length < 5) {
      throw new Error('Valid address is required');
    }

    if (!vehicle || !vehicle.carType) {
      throw new Error('Vehicle details are required');
    }

    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const validateLogin = (req, res, next) => {
  try {
    const { email, password } = req.body;

    validateEmail(email);
    
    if (!password) {
      throw new Error('Password is required');
    }

    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  validateUserRegistration,
  validateDriverRegistration,
  validateLogin
};