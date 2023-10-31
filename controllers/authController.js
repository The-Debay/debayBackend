const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const _ = require('lodash');
const ApiResponse = require('../utils/responseSchema');
const { SUCCESS } = require('../utils/constantMessage');
const bcrypt = require('bcrypt');
const { passwordRegex, generateSixDigitRandomNumber, otpExpiredTime } = require('../utils/functions');
const { sendMails } = require('./nodeMailerServices');
const { setRedisKey } = require("../cahching/rediesMethods");
const { getRedisKey } = require('../cahching/rediesMethods');
const { deleteRedisKey } = require('../cahching/rediesMethods');

const getToken = (id) => {
  return jwt.sign({ id: id }, process.env.SECREAT_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}


exports.checkUsernameExist = exports.signUp = catchAsync ( async (req, res, next) => { 
  let username = req.params.username;
  let user = await User.findOne({where:{
    username:username,
  }})
  let isUniqueUsername = !user;
    return res.status(201).json(new ApiResponse({message:'success',data:{isUniqueUsername}}))
})
  
exports.signUp = catchAsync(async (req, res, next) => {
  
  let { email, password, username } = req.body
  if (!(email && password && username)) return next(new AppError('please provide username email and password', 400));
  if (!passwordRegex.test(password)) return next(
    new AppError('password must include one uppercase letter one lower one special one numberic and minimum 10 character', 400)
  )
  let isEmailExist = await User.findOne({where:{ email }})
  if (isEmailExist) return next(new AppError('email already exist', 400))
  isUsernameExist = await User.findOne({where:{ username }})
  if (isUsernameExist) return next(new AppError('username already exist', 400))

  const newOtpTime = otpExpiredTime(1);
  const newOtp = generateSixDigitRandomNumber();
  let user;
  let otpDetails = {
    otp:newOtp,
    newOtpTime:newOtpTime
  }
  user = await User.create({email,password,username});
  setRedisKey(`otp__${user.id}`,JSON.stringify(otpDetails),900);
  sendMails({customerName:'Hi',otp:newOtp,email})
  return res.status(201).json(new ApiResponse({message:'success',data:{user}}))
})

exports.verifyEmailOtp = catchAsync( async ( req, res, next) => {
  let {otp} = req.body;
  let user = req.user;
  if(user.isVerified) return new AppError('email already exist',400);
  let myOtpData = getRedisKey(user.id);
  if(!myOtpData) return next(new AppError('otp expired',400));
  myOtpData = JSON.parse(myOtpData);
  if(myOtpData.otp != otp) return next(new AppError('invalid otp',400));
  deleteRedisKey(user.id);
  await User.update({
    isVerified:true
  },{
    where:{
      id:user.id
    }
  })
  return res.status(200).json(new ApiResponse({message:"otp verification successfuly",data:{}}));
})

exports.generateNewOtp = catchAsync ( async (req, res, next) => {
  let user = req.user;
  if(user.isVerified) return next(new AppError('user already verified',400));
  const newOtpTime = otpExpiredTime(1);
  const newOtp = generateSixDigitRandomNumber();
  let otpDetails = {
    otp:newOtp,
    newOtpTime:newOtpTime
  }
  await setRedisKey(`otp__${user.id}`,JSON.stringify(otpDetails),900);
  sendMails({customerName:'',otp:newOtp,email:user.email})
  res.status(200).json(new ApiResponse({message:`otp sent ${user.email} successfully`,data:{}}));
})

exports.login = catchAsync(async (req,res,next) => {
  let data = req.body;
  let user = req.user;
  if (!bcrypt.compareSync(_.get(data, 'password', ""), user.password)) return next(new AppError("invalid password", 400))
  let token = getToken(user.id)
  return res.status(201).json(new ApiResponse({message:'login success ',data:{token,user}}))
})





