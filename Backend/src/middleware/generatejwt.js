const jwt = require('jsonwebtoken');
const User = require('../users/UserSchema'); // Ensure this points to your User model
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; // Use process.env to access environment variables

const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId); // Fetch user by ID
    if (!user) {
      throw new Error('User not found');
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role }, // Payload
      JWT_SECRET_KEY, // Secret key for signing
      {
        expiresIn: '1h', // Token expiration
      }
    );

    return token; // Return the generated token
  } catch (error) {
    console.error(error); // Log the error for debugging
    throw new Error('Token generation failed'); // Re-throw the error with a generic message
  }
};

module.exports = generateToken;
