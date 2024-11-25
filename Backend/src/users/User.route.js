const express = require('express');
const User = require('./UserSchema');
const router = express.Router();
const bcrypt = require('bcrypt');
const verifyToken = require('../middleware/verfiyToken');
const generateToken = require('../middleware/generatejwt');
// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Registration failed due to an issue',
      error: error.message,
    });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // console.log('Login attempt with:', req.body);
    const existUser = await User.findOne({ email });
    // console.log(existUser);
    if (!existUser) {
      return res.status(400).json({
        status: false,
        message: 'User not found',
      });
    }
    const isPasswordValid = await bcrypt.compare(password, existUser.password);
    // console.log('is password', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password',
      });
    }
    const token = await generateToken(existUser.id);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashed Password', hashedPassword);
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
        id: existUser._id,
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
    res.status(500).json({
      success: false,
      message: 'Login failed due to an issue',
    });
  }
});

//  logout
router.post('/logout', async (req, res) => {
  try {
    // Clear the specific cookie by name, e.g., 'token'
    res.clearCookie('token');

    res.status(200).json({
      success: true,
      message: 'User Logout successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Logout failed',
      error: error.message,
    });
  }
});

// delete
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(404).json({
        success: false,
        message: 'User not find ',
      });
    }
    res.status(200).json({
      success: true,
      message: 'User Deleted Successfully ',
    });
    console.log(id);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Deleting failed',
      error: error.message,
    });
  }
});

// Get all users
router.get('/getusers', async (req, res) => {
  try {
    const getAllUsers = await User.find({}, 'id email role').sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      message: 'Find All Users ',
      user: getAllUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to Fetch all Users',
      error: error.message,
    });
  }
});

// Update users

router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    console.log(id, role);
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'User updated Successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error while updating user',
      error: error.message,
    });
  }
});

// Edit Profile
// router.patch('/edit-profile', async (req, res) => {
//   try {
//     const { userId, oldPassword, newPassword, ...updateData } = req.body;
//     if ((oldPassword || newPassword) && (!oldPassword || !newPassword)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Both old password and new password are required when updating the password.',
//       });
//     }

//     // Find the user by ID
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       });
//     }

//     // Verify the old password
//     const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({
//         success: false,
//         message: 'Old password is incorrect',
//       });
//     }

//     // Hash the new password if provided
//     const hashedNewPassword = await bcrypt.hash(newPassword, 10);

//     // Prepare the updated user data
//     const updatedData = { ...updateData };
//     if (newPassword) {
//       updatedData.password = hashedNewPassword;
//     }

//     // Update the user profile with the new data
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { $set: updatedData },
//       { new: true, runValidators: true }
//     );

//     res.status(200).json({
//       success: true,
//       message: 'Profile updated successfully',
//       user: updatedUser,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error while editing profile',
//       error: error.message,
//     });
//   }
// });

// Update Profile
router.patch('/update-profile', async (req, res) => {
  try {
    const { userId, ...updateData } = req.body;

    // Ensure userId is provided
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required.',
      });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    // Update the user profile with the provided data
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
    res.status(500).json({
      success: false,
      message: 'Error while updating profile.',
      error: error.message,
    });
  }
});

module.exports = router;
