const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verfiyToken');

// Import the controller functions
const {
  register,
  login,
  logout,
  deleteUser,
  getAllUsers,
  updateUserRole,
  updateUserProfile,
  updatePassword,
} = require('./UserController');
const verifyAdmin = require('../middleware/verifyAdmin');

// Register endpoint
router.post('/register', register);

// Login endpoint
router.post('/login', login);

// Logout
router.post('/logout', verifyToken, logout);

// Delete user
router.delete('/delete/:id', verifyToken, deleteUser);

// Update user profile
router.patch('/update-profile', verifyToken, updateUserProfile);

// Update Password

router.patch('/update-password', verifyToken, updatePassword);
//  ******************** admin routes ********************

// Get all users
router.get('/getusers', verifyAdmin, getAllUsers);

// Update user role

router.put('/update/:id', verifyAdmin, updateUserRole);

module.exports = router;
