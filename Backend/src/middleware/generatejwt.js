const jwt = require('jsonwebtoken');
const User = require('../users/UserSchema');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET_KEY,
      {
        expiresIn: '1d',
      }
    );

    return token;
  } catch (error) {
    console.error(error);
    throw new Error('Token generation failed');
  }
};

module.exports = generateToken;
