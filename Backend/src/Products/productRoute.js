const express = require('express');
const Product = require('../Products/Product.modal');
const Reviews = require('../reviews/Reviews.modal');

const router = express.Router();

router.post('/create-product', async (req, res) => {
  try {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    const review = await Reviews.find({ productId: savedProduct._id });
    if (review.length > 0) {
      const totalReviews = review.reduce((acc, curr) => {
        acc += curr.rating;
      }, 0);
      const averageRating = totalReviews / review.length;
      savedProduct.rating = averageRating;
      await savedProduct.save();
    }

    res.status(201).json({
      success: true,
      data: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error while creating product',
      error: error.message,
    });
  }
});

router.get('/', async (req, res) => {
  const {
    category,
    color,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
  } = req.query;
  let filter = {};
  if (category && category !== 'all') {
    filter.category = category;
  }
  if (color && color !== 'all') {
    filter.color = color;
  }
  if (minPrice && maxPrice) {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    if (!NaN(min) && !NaN(max)) {
      filter.price = { $gte: min, $lte: max };
    }
  }
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const totalProducts = await Product.countDocuments(filter);
  const totalPages = Math.ceil(totalProducts / parseInt(limit));
  const products = await Product.find(filter)
    .skip(skip)
    .limit(parseInt(limit))
    .populate('author', 'email')
    .sort({ createdAt: -1 });
  res.status(200).send({ products, totalPages, totalProducts });
});

router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const products = await Product.findById(productId).populate(
      'author',
      'username email'
    );
    if (!products) {
      return res.status(400).json({
        success: false,
        message: 'Product not found',
      });
    }
    const review = await Reviews.find({ productId }).populate(
      'userId',
      'username email'
    );
    res.status(200).json({
      success: true,
      products,
      review,
    });
  } catch (error) {}
});

router.patch('/update-product/:id', async (req, res) => {
  try {
    const paramId = req.params.id;
    const updateProduct = await Product.findByIdAndUpdate(
      paramId,
      { ...req.body },
      { new: true }
    );

    if (!updateProduct) {
      return res.status(400).json({
        success: false,
        message: 'Provide the values correctly',
      });
    }
    res.status(200).json({
      success: true,
      message: 'item Updated successfully',
      product: updateProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error while updating product',
      error: error.message,
    });
  }
});
module.exports = router;
