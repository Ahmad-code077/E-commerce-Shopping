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

    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    console.log('decoded', decoded);
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Token has expired',
      });
    }
    console.log('error from verify token', error);
    return res.status(401).json({
      message: 'Error while verifying token',
    });
  }
};

module.exports = verifyToken;
