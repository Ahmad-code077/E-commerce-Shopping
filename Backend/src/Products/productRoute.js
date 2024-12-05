// routes/productRoutes.js
const express = require('express');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getRelatedProducts,
} = require('./ProductController');
const verifyToken = require('../middleware/verfiyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

const router = express.Router();

router.post('/create-product', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.patch('/update-product/:id', verifyToken, verifyAdmin, updateProduct);
router.delete('/delete-product/:id', deleteProduct);
router.get('/related/:id', getRelatedProducts);

module.exports = router;
