// const jwt = require('jsonwebtoken');

// const generateToken = (payload, expiresIn = '7d') => {
//   return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
// };

// const verifyToken = (token) => {
//   try {
//     return jwt.verify(token, process.env.JWT_SECRET);
//   } catch (error) {
//     throw new Error('Invalid or expired token');
//   }
// };

// const generateAuthTokens = (user) => {
//   const payload = {
//     id: user._id,
//     email: user.email,
//     role: user.role || 'user'
//   };

//   const accessToken = generateToken(payload, '8h');
//   const refreshToken = generateToken({ id: user._id }, '7d');

//   return { accessToken, refreshToken };
// };

// module.exports = {
//   generateToken,
//   verifyToken,
//   generateAuthTokens
// };


const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role || 'user'
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = {
  generateToken,
  verifyToken
};
