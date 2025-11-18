const express = require('express');
const router = express.Router();
const {
  registerUser,
  registerDriver,
  login,
  getMe,
} = require('../controllers/authController');
const { auth } = require('../middleware/auth');
const {
  validateUserRegistration,
  validateDriverRegistration,
  validateLogin
} = require('../middleware/validation');

router.post('/register/user', validateUserRegistration, registerUser);
router.post('/register/driver', validateDriverRegistration, registerDriver);
router.post('/login', validateLogin, login);

// protected Routes
router.get('/me', auth, getMe);

module.exports = router;