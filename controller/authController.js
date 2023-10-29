const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const db = require("../dbConfig");
const jwt = require("jsonwebtoken");
const _ = require('lodash');
const ApiResponse = require('../utils/responseSchema');
const { SUCCESS } = require('../utils/constantMessage');
const bcrypt = require('bcrypt');
const { passwordRegex, generateSixDigitRandomNumber, otpExpiredTime } = require('../utils/functions');
const { sendMails } = require('./nodeMailerServices');

const getToken = (id) => {
  return jwt.sign({ id: id }, process.env.SECREAT_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

exports.checkUsernameExist = exports.signUp = catchAsync ( async (req, res, next) => { 
  console.log(req.params,"params")
  let username = req.params.username;
  let user = await db.User.findOne({where:{
    username:username,
  }})
  let isUniqueUsername = !user;
    return res.status(201).json(new ApiResponse({message:'success',data:{isUniqueUsername}}))
})
  
exports.signUp = catchAsync ( async (req, res, next) => { 
  console.log('called')
    let { name,email, password, username } = req.body
    if(!(name || email || password || username)) return next(new AppError('please provide details',400));
    if (!passwordRegex.test(password)) return next(new AppError('password must include one uppercase letter one lower one special one numberic and minimum 10 character', 400))
    let user = await db.User.findOne({where:{
        email:email,
    }})
    if(user) return next( new AppError('email already exist',400))
    user = await db.User.findOne({where:{
      username:username,
   }})
   const lastTime = otpExpiredTime()

   let newOtp = generateSixDigitRandomNumber()
  if(user) return next( new AppError('username already exist',400))
    user = await db.User.create({name,email,password,username,otp:newOtp,lastOtpTime:lastTime});
    sendMails({customerName:'Hi',otp:newOtp,email})
    return res.status(201).json(new ApiResponse({message:'success',data:{user}}))
})

exports.verifyEmailOtp = catchAsync( async ( req, res, next) => {
  let {email, otp} = req.body;
  if(!email) return next(new AppError('provide email',400))
  if(!otp) return next(new AppError('provide otp',400))
  let user = await db.User.findOne({
    where:{
      email:email
    }
  })
  if(!user) return next(new AppError('user not exist',400))
  if(user.isEmailVerified) return next(new AppError('email already verified',400))
  if(Number(user.lastOtpTime) < Date.now()) return next(new AppError('otp expired',400));
  if(!(user.otp == otp)) return next(new AppError('invalid otp please provide valid otp',400))
  await db.User.update({
    isEmailVerified:true
  },
  {
    where:{
      email:email
    }
  }
  )
  res.status(200).json(new ApiResponse({message:"email verification successfully",data:{}}))
})

exports.generateNewOtp = catchAsync ( async (req, res, next) => {
  let {email} = req.body;
  const lastTime = otpExpiredTime()
  let newOtp = generateSixDigitRandomNumber()
  await db.User.update({
    otp:newOtp,
    lastOtpTime:lastTime
  },{
    where:{
      email
    }
  })
  sendMails({customerName:'Hi',otp:newOtp,email})
  res.status(200).json(new ApiResponse({message:'otp sent successfully',data:{}}))
})

exports.login = catchAsync(async (req,res,next) => {
  let data = req.body;
  let user = req.user;

  console.log(user)
  if (!bcrypt.compareSync(_.get(data, 'password', ""), user.password)) return next(new AppError("invalid password", 400))
  let token = getToken(user.id)
  return res.status(201).json(new ApiResponse({message:'login success ',data:{token,user}}))
})

exports.createProfile = catchAsync ( async (req, res, next) => {
  let id = req.userId;
  let payload = req.body;
  let profile = await db.Profile.create({
    ...payload,
    userId:id
  })
  return res.status(201).json(new ApiResponse({message:'profile created successfully ',data:{profile}}))
} )

exports.getProfile = catchAsync ( async (req, res, next) => {
  let id = req.userId;
  let user = await db.User.findOne({
    where:{
      id
    },
    attributes: { exclude: ['password'] },
    include:[{
      model:db.Profile,
      as:'profile',
      attributes: { exclude: ['userId'] },
    }]
  })

  console.log(user)
  return res.status(201).json(new ApiResponse({message:'profile created successfully ',data:{user}}))
})

exports.updateProfile = catchAsync ( async (req, res, next) => {
  let id = req.userId;
  console.log(id,";id")

  let user = await db.Profile.update(_.get(req,'body',{}),{ 
    where:{
      userId:id
    }
  })
  return res.status(201).json(new ApiResponse({message:'profile updated successfully ',data:{}}))
} )




