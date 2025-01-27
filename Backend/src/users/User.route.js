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

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.delete('/delete/:id', verifyToken, deleteUser);

router.patch('/update-profile', verifyToken, updateUserProfile);

router.patch('/update-password', verifyToken, updatePassword);
//  ******************** admin routes ********************

router.get('/getusers', verifyAdmin, getAllUsers);

router.put('/update/:id', verifyAdmin, updateUserRole);

module.exports = router;
