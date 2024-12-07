const bcrypt = require('bcrypt');
const User = require('./UserSchema');
const generateToken = require('../middleware/generatejwt');
const ErrorHandler = require('../ErrorCatchingFiles/ErrorHandler');

// Register endpoint
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler('User Already Exists', 400));
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
    });
  } catch (error) {
    return next(new ErrorHandler('Registration failed due to an issue', 500));
  }
};

// Login endpoint
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (!existUser) {
      return next(new ErrorHandler('User not found', 400));
    }

    const isPasswordValid = await bcrypt.compare(password, existUser.password);
    if (!isPasswordValid) {
      return next(new ErrorHandler('Invalid password', 401));
    }

    const token = await generateToken(existUser.id);
    const hashedPassword = await bcrypt.hash(password, 10);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.status(200).json({
      success: true,
      message: 'Login successfully',
      token,
      user: {
        _id: existUser._id,
        username: existUser.username,
        email: existUser.email,
        role: existUser.role,
        profileImage: existUser.profileImage,
        bio: existUser.bio,
        profession: existUser.profession,
        createdAt: existUser.createdAt,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return next(new ErrorHandler('Login failed due to an issue', 500));
  }
};

// Logout
const logout = async (req, res, next) => {
  try {
    res.clearCookie('token');
    res.status(200).json({
      success: true,
      message: 'User Logout successfully',
    });
  } catch (error) {
    return next(new ErrorHandler('Logout failed', 500));
  }
};

// Delete user
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return next(new ErrorHandler('User not found', 404));
    }
    res.status(200).json({
      success: true,
      message: 'User Deleted Successfully',
    });
  } catch (error) {
    return next(new ErrorHandler('Deleting failed', 500));
  }
};

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const getAllUsers = await User.find({}, 'id email role').sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      message: 'Found All Users',
      user: getAllUsers,
    });
  } catch (error) {
    return next(new ErrorHandler('Failed to Fetch all Users', 500));
  }
};

// Update user role
const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      return next(new ErrorHandler('User not found', 400));
    }

    res.status(200).json({
      success: true,
      message: 'User updated Successfully',
      user,
    });
  } catch (error) {
    return next(new ErrorHandler('Error while updating user', 500));
  }
};

// Update user profile
const updateUserProfile = async (req, res, next) => {
  try {
    const { userId, ...updateData } = req.body;

    if (!userId) {
      return next(new ErrorHandler('User ID is required.', 400));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(new ErrorHandler('User not found.', 404));
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      user: updatedUser,
    });
  } catch (error) {
    return next(new ErrorHandler('Error while updating profile.', 500));
  }
};
// Update password controller
const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword || !confirmPassword) {
      return next(new ErrorHandler('All fields are required', 400));
    }
    if (newPassword !== confirmPassword) {
      return next(
        new ErrorHandler('New Password and Confirm Password do not match', 400)
      );
    }

    // Find the user by ID
    const user = await User.findById(req.userId).select('+password');
    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    // Verify current password
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordMatch) {
      return next(new ErrorHandler('Current password is incorrect', 401));
    }

    // Hash new password
    user.password = newPassword; // Assign plain text
    await user.save(); // Let the pre-save hook hash it, if applicable

    res.status(200).json({
      success: true,
      message: 'Password updated successfully!',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  deleteUser,
  getAllUsers,
  updateUserRole,
  updateUserProfile,
  updatePassword,
};
