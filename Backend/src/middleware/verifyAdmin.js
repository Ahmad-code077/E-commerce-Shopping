const verifyAdmin = async (req, res, next) => {
  if (req.role !== 'admin') {
    return res.status(403).send({
      success: false,
      message: 'You are not authorized to Access this',
    });
  }
  next();
};
module.exports = verifyAdmin;
