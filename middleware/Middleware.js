const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { promisify } = require("util");
const morgan = require("morgan");
const _ = require("lodash")
const db = require("../dbConfig");
const { NOT_FOUND } = require("../utils/constantMessage");

exports.protectOtpAuthentication = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token)
  if (!token) {
    return next(new AppError("No token provided.", 401));
  }
  jwt.verify(token, process.env.SECREAT_KEY, (error, decoded) => {
    if (error) {
      return next(new AppError(_.get(error,'message',"").includes('jwt expired') ? "token expired" : "Failed to authenticate token", 401));
    }

    const { exp } = decoded;
    req.userId = decoded.id
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    if (exp < currentTime) {
      return next(new AppError("Token has expired.", 401));
    }
    next();
  });
});
