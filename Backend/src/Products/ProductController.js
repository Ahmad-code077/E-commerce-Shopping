// controllers/productController.js
const Product = require('../Products/Product.modal');
const Reviews = require('../reviews/Reviews.modal');
const mongoose = require('mongoose');
const ErrorHandler = require('../ErrorCatchingFiles/ErrorHandler');
const { v2 } = require('cloudinary');

const createProduct = async (req, res, next) => {
  try {
    // console.log('Incoming body:', req.body);
    // console.log('Incoming files:', req.files);

    if (!req.files?.image) {
      return next(new ErrorHandler('Image file is missing', 400));
    }
    const { name, price, category, description, color } = req.body;
    const file = req.files.image;
    const uploadResult = await v2.uploader.upload(file.tempFilePath, {
      folder: 'product_image', // Change folder name as required
    });
    console.log('Incoming files:', req.files);

    // Basic validation for required fields
    if (
      !name ||
      !price ||
      !category ||
      !description ||
      !color ||
      !req.files?.image
    ) {
      return next(new ErrorHandler('Please provide all required fields', 400));
    }

    // Upload the image to Cloudinary

    // Create a new product using the data from the request body
    const newProduct = new Product({
      name,
      price,
      image: uploadResult.secure_url, // Save the secure URL from Cloudinary
      category,
      description,
      color,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    // Calculate and update the rating if reviews exist
    const reviews = await Reviews.find({ productId: savedProduct._id });
    if (reviews.length > 0) {
      const totalReviews = reviews.reduce((acc, curr) => acc + curr.rating, 0);
      const averageRating = totalReviews / reviews.length;
      savedProduct.rating = averageRating;
      await savedProduct.save();
    }

    // Respond with the newly created product data
    res.status(201).json({
      success: true,
      data: savedProduct,
      message: 'Product Added Successfully',
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return next(new ErrorHandler('Error while creating product', 500));
  }
};

const getProducts = async (req, res, next) => {
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

    if (category && category !== 'all') filter.category = category;
    if (color && color !== 'all') filter.color = color;
    if (minPrice && maxPrice) {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if (!isNaN(min) && !isNaN(max)) filter.price = { $gte: min, $lte: max };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitValue = parseInt(limit);

    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limitValue);

    const products = await Product.find(filter)
      .skip(skip)
      .limit(limitValue)
      .populate('author', 'email')
      .sort({ createdAt: -1, _id: 1 });

    res.status(200).send({ products, totalPages, totalProducts });
  } catch (error) {
    return next(new ErrorHandler('Error fetching products', 500));
  }
};

const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate(
      'author',
      'username email'
    );
    if (!product) return next(new ErrorHandler('Product not found', 400));

    const review = await Reviews.find({ productId }).populate(
      'userId',
      'username email'
    );
    res.status(200).json({ success: true, product, review });
  } catch (error) {
    return next(new ErrorHandler('Error fetching product', 500));
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const paramId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(
      paramId,
      { ...req.body },
      { new: true }
    );

    if (!updatedProduct)
      return next(new ErrorHandler('Product not found', 400));

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    return next(new ErrorHandler('Error while updating product', 500));
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct)
      return next(new ErrorHandler('Product not found', 400));

    await Reviews.deleteMany({ productId: id });
    res
      .status(200)
      .json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    return next(new ErrorHandler('Error while deleting product', 500));
  }
};

const getRelatedProducts = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return next(new ErrorHandler('Invalid product ID format', 400));

    const product = await Product.findById(id);
    if (!product) return next(new ErrorHandler('Product not found', 404));

    const allProductsInCategory = await Product.find({
      category: product.category,
    });

    const titleWords = product.name
      .split(' ')
      .filter((word) => word.length > 1)
      .slice(0, 2)
      .join('|');
    const titleRegex = new RegExp(titleWords, 'i');

    let relatedProducts = await Product.find({
      _id: { $ne: id },
      $or: [{ name: { $regex: titleRegex } }, { category: product.category }],
    });

    if (relatedProducts.length === 0) {
      const partialNameRegex = new RegExp(product.name.split(' ')[0], 'i');
      relatedProducts = await Product.find({
        _id: { $ne: id },
        name: { $regex: partialNameRegex },
      });
    }

    res.status(200).send({ success: true, relatedProducts });
  } catch (error) {
    return next(new ErrorHandler('Error while fetching related products', 500));
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getRelatedProducts,
};
