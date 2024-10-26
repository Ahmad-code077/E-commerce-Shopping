const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const cors = require('cors');
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173/',
    credentials: true,
  })
);
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// console.log(process.env.MONGOO_URL);

main()
  .then(() => console.log('mongoos connected successfully'))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGOO_URL);
  // if your database has auth enabled
}

app.get('/', (req, res) => {
  res.send('E-Commerce App is running at port 5000');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
