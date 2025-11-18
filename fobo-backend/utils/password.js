const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const validatePassword = (password) => {
  const minLength = 6;
  if (password.length < minLength) {
    throw new Error(`Password must be at least ${minLength} characters long`);
  }
  return true;
};

module.exports = {
  hashPassword,
  comparePassword,
  validatePassword
};