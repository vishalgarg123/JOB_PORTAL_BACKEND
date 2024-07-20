const JWT = require("jsonwebtoken");
const User = require("../models/auth");
require("dotenv").config();
const ErrorResponse = require("../utils/errorResponse");
//check user is authorized or not
exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  //make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route"));
  }

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(error);
  }
};

//middleware for admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role === 0) {
    return next(new ErrorResponse("Access denied, you must an admin", 401));
  }
  next();
};
