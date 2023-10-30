const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { promisify } = require("util");
const morgan = require("morgan");
const _ = require("lodash");
const db = require("../config/sequelize");
const { NOT_FOUND } = require("../utils/constantMessage");

exports.protectOtpAuthentication = catchAsync(async (req, res, next) => {
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

exports.checkOtpTime = catchAsync(async (req, res, next) => {
  let {email} = req.body
  if(!email) return next(new AppError('provide email',400))
  let user = await db.User.findOne({
    where:{
      email:email
    }
  })
  if(!user) return next(new AppError('user not exist',400))
  if(user.isEmailVerified) return next(new AppError('email already verified',400))
  if(Number(user.lastOtpTime) > Date.now()){
      let calculateSeconds = Math.ceil((Number(user.lastOtpTime) - Date.now()) / 1000);
      let temp = calculateSeconds > 60 ? `wait ${Math.ceil(calculateSeconds/60)} minutes ` :` wait ${calculateSeconds} seconds`
      return next(new AppError(temp + "for new otp",400))
  }
  next()
});
