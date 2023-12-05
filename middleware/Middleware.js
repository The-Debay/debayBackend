const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { promisify } = require("util");
const morgan = require("morgan");
const _ = require("lodash");
const db = require("../config/sequelize");
const { NOT_FOUND } = require("../utils/constantMessage");
const { checkKeyExistOrNot } = require("../utils/functions");
const User = require("../models/userModel");
const { getRedisKey } = require("../cahching/rediesMethods");
const { object } = require("joi");

exports.protectRoute = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return next(new AppError("No token provided.", 401));
  }
  jwt.verify(token, process.env.SECREAT_KEY, (error, decoded) => {
    if (error) {
      return next(
        new AppError(
          _.get(error, "message", "").includes("jwt expired")
            ? "token expired"
            : "Failed to authenticate token",
          401
        )
      );
    }

    const { exp } = decoded;
    req.userId = decoded.id;
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    if (exp < currentTime) {
      return next(new AppError("Token has expired.", 401));
    }
    next();
  });
});

exports.checkEmailVerified = catchAsync(async (req, res, next) => {
  const data = req.body;
  if (!(data.email || data.username))
    return next(new AppError("please provide username or email", 400));
  let user = null;
  if (data.email) {
    user = await db.User.findOne({
      where: {
        email: data.email,
      },
    });
  } else {
    user = await db.User.findOne({
      where: {
        username: data.username,
      },
    });
  }
  if (!user)
    return next(new AppError("user does't exist please signup first", 400));
  if (!user.isEmailVerified)
    return next(new AppError("please verify your email first", 400));
  req.user = user;
  next();
});

exports.checkNewOtpTime = catchAsync(async (req, res, next) => {
  let user = req.user;
 
  let otpData = await  getRedisKey(`otp__${user.id}`);
  
  if (!otpData) return next();
  
  otpData = JSON.parse(otpData);
  
  let newOtpTime = otpData.newOtpTime;
  if (Number(newOtpTime) > new Date()) {
    let calculateSeconds = Math.ceil(
      (new Date(Number(newOtpTime)).getTime() - Date.now()) / 1000
    );
    return next(
      new AppError(`wait ${calculateSeconds} seconds for new Otp`, 400)
    );
  }else{
    next();
  }
 
});

exports.checkUserExistOrNot = catchAsync(async (req, res, next) => {
  let data = req.body;
  if (
    !data ||
    Object.keys(data).includes("gmail") ||
    Object.keys(data).includes("username")
  ) {
    return next(new AppError("please provide email or username", 401));
  }
  let findQuery = { username: req?.body?.username };
  if (Object.keys(data).includes("gmail")) {
    findQuery = { email: req?.body?.email };
  }
  findQuery = {
    email: req.body.email,
  };
  let user = await User.findOne({
    where: {
      ...findQuery,
    },
  });
  if (!user) return next(new AppError(NOT_FOUND("user"), 401));
  req.user = user;
  next();
});
