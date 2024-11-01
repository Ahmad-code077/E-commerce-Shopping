const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not Authenticated',
      });
    }
    const decode = jwt.verify(token, JWT_SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: 'Not Authenticated',
      });
    }
    req.userId = decode.userId;
    req.role = decode.role;
    next();
  } catch (error) {
    console.log('error from verify token', error);
    res.status(401).json({
      message: 'Error while verifying token',
    });
  }
};

module.exports = verifyToken;
