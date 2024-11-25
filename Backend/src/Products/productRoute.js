const express = require('express');
const Product = require('../Products/Product.modal');
const Reviews = require('../reviews/Reviews.modal');
const verifyToken = require('../middleware/verfiyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();
const mongoose = require('mongoose');

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
  try {
    const {
      category,
      color,
      minPrice,
      maxPrice,
      page = 1,
      limit = 8,
    } = req.query;

    let filter = {};

    // Build filter conditions
    if (category && category !== 'all') {
      filter.category = category;
    }
    if (color && color !== 'all') {
      filter.color = color;
    }
    if (minPrice && maxPrice) {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if (!isNaN(min) && !isNaN(max)) {
        filter.price = { $gte: min, $lte: max };
      }
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitValue = parseInt(limit);

    // Get total count for pagination metadata
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limitValue);

    // Fetch products with filter, pagination, and sorting
    const products = await Product.find(filter)
      .skip(skip)
      .limit(limitValue)
      .populate('author', 'email')
      .sort({ createdAt: -1, _id: 1 });

    res.status(200).send({ products, totalPages, totalProducts });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send({ message: 'Error fetching products', error });
  }
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

router.patch(
  '/update-product/:id',
  verifyToken,
  verifyAdmin,
  async (req, res) => {
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
  }
);

router.delete('/delete-product/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProduct = await Product.findByIdAndDelete(id);
    if (!deleteProduct) {
      return res.status(400).json({
        success: false,
        message: 'Product not found',
      });
    }
    await Reviews.deleteMany({ productId: id });
    res.status(200).json({
      success: true,
      message: 'Product Deleted Successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error while updating product',
      error: error.message,
    });
  }
});

router.get('/related/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid product ID format' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    // Check all products in the same category
    const allProductsInCategory = await Product.find({
      category: product.category,
    });
    console.log('All Products in Category:', allProductsInCategory);

    // Limit regex to the first two meaningful words
    const titleWords = product.name
      .split(' ')
      .filter((word) => word.length > 1)
      .slice(0, 2)
      .join('|');
    const titleRegex = new RegExp(titleWords, 'i');

    console.log('Title Regex:', titleRegex);
    console.log('Category:', product.category);

    // Query for related products by limited name or category
    let relatedProducts = await Product.find({
      _id: { $ne: id },
      $or: [{ name: { $regex: titleRegex } }, { category: product.category }],
    });

    console.log('Related Products (Name or Category):', relatedProducts);

    // Fallback: Match partial name if no category matches
    if (relatedProducts.length === 0) {
      const partialNameRegex = new RegExp(product.name.split(' ')[0], 'i');
      relatedProducts = await Product.find({
        _id: { $ne: id },
        name: { $regex: partialNameRegex },
      });
      console.log('Related Products (Partial Name):', relatedProducts);
    }

    res.status(200).send({ success: true, relatedProducts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error while fetching related products',
      error: error.message,
    });
  }
});

module.exports = router;
