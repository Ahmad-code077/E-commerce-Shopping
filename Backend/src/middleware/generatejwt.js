const jwt = require('jsonwebtoken');
const User = require('../users/UserSchema');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const generateToken = async (userId) => {
  try {
    if (!JWT_SECRET_KEY) {
      throw new Error('JWT_SECRET_KEY is not defined in environment variables');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    console.log('user', user);
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET_KEY,
      { expiresIn: '1d' }
    );
    return token;
  } catch (error) {
    console.error('Error generating token:', error.message);
    throw new Error('Token generation failed: ' + error.message);
  }
};

module.exports = generateToken;
