const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || 5000;

// Middleware
// Middleware
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb' }));
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:5173/',
    credentials: true,
  })
);

const authRoute = require('./src/users/User.route.js');
app.use('/api/auth', authRoute);

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
