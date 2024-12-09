const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const error = require('./src/ErrorCatchingFiles/ErrorMiddleWare.js');
const { v2 } = require('cloudinary');
const port = process.env.PORT || 5000;
const fileUpload = require('express-fileupload');

v2.config({
  cloud_name: process.env.Cloudinay_Cloud_Name,
  api_key: process.env.Cloudinay_Api_Key,
  api_secret: process.env.Cloudinay_Api_Secret_Key,
});
// Middleware
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb' }));
app.use(fileUpload({ useTempFiles: true }));

app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
const authRoute = require('./src/users/User.route.js');
const productRoute = require('./src/Products/productRoute.js');

app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);

app.use(error);

// Database connection
async function main() {
  await mongoose.connect(process.env.MONGOO_URL);
  console.log('MongoDB connected successfully');
}

main().catch((err) => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.send('E-Commerce App is running at port 5000');
});

// Server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
