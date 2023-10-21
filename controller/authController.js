const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const db = require("../dbConfig");
const jwt = require("jsonwebtoken");
const _ = require('lodash');
const ApiResponse = require('../utils/responseSchema');
const { SUCCESS } = require('../utils/constantMessage');
const bcrypt = require('bcrypt');
const { passwordRegex } = require('../utils/functions');

const getToken = (id) => {
    return jwt.sign({ id: id }, process.env.SECREAT_KEY)
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
  if(user) return next( new AppError('username already exist',400))
    user = await db.User.create({name,email,password,username});
    let token = getToken(user.id)
    return res.status(201).json(new ApiResponse({message:'success',data:{user,token}}))
})
  

  

  exports.login = catchAsync(async (req,res,next) => {
    const data = req.body;
    if(!(data.email || data.username)) return next(new AppError('please provide username or email',400))
    let user = null;
    if(data.email){
      user = await db.User.findOne({where:{
        email:data.email,
    }}) 
    }else{
      user =  await db.User.findOne({where:{
        username:data.username,
      }})
    }
    if(!user) return next( new AppError("user does't exist please signup first", 400));
    if (!bcrypt.compareSync(_.get(data, 'password', ""), user.password)) return next(new AppError("invalid password", 400))
    let token = getToken(user.id)
    return res.status(201).json(new ApiResponse({message:'login success ',data:{token,user}}))

  })


exports.profile = catchAsync(async (req, res, next) => {
    const userId = _.get(req, 'id', null);
    let user = await db.User.findByPk(userId);
    return res.status(201).json(new ApiResponse({ message: SUCCESS, data: { profile: user } }));
  });

