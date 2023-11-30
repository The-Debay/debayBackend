const { get } = require("lodash");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { countryArr } = require("../utils/constant");
const { returnKeys } = require("../utils/functions");
const ApiResponse = require("../utils/responseSchema");
const Tags = require("../models/tags");
const AppError = require("../utils/appError");
module.exports = {
  createProfile: catchAsync(async (req, res, next) => {
    let id = req.userId;
    let payload = req.body;
    let isProfileExist = Profile.findOne({where:{userId:id}})
    if(isProfileExist) return next(new AppError('profile already exist',400))
    let payloadData = returnKeys(payload,'name','profile_avtar','bio','country','tagsId')
    let profile = await Profile.create({
      ...payloadData,
      userId: id,
    });

    if(payload.tagsId && payload.tagsId.length){
      let allTags = await Tags.findAll({
        where:{
          id:payload.tagsId
        }
      })
      console.log(allTags)
      // profile.setTags(allTags);
    }
    return res.status(201).json(
      new ApiResponse({
        message: "profile created successfully ",
        data: { profile },
      })
    );
  }),

  getProfile: catchAsync(async (req, res, next) => {
    let id = req.userId;
    let user = await User.findOne({
      where: {
        id,
      },
      attributes: { exclude: ["password","lastPasswordChange","updated"] },
      include: [
        {
          model: Profile,
          as: "profile",
          attributes: { exclude: ["userId"] },
         
        },
      ],
    });

    return res.status(201).json(
      new ApiResponse({
        message: "profile created successfully ",
        data: { user },
      })
    );
  }),

  updateProfile: catchAsync(async (req, res, next) => {
    let id = req.userId;
    let payload = req.body;
    let payloadData = returnKeys(payload,'name','profile_avtar','bio','country','tagsId')
    
    let profile = await Profile.findOne({where:{userId:id}})
     await Profile.update(payloadData, {
      where: {
        userId: id,
      },
    });
    console.log(payloadData.tagsId,"payloadData")
    if(payload.tagsId && payload.tagsId.length){
      let allTags = await Tags.findAll({
        where:{
          id:payload.tagsId
        }
      })
     await profile.setTags(allTags);
    }
  
    return res
      .status(200)
      .json(
        new ApiResponse({ message: "profile updated successfully "})
      );
  }),

  getAllCountries: catchAsync(async (req, res, next) => {
    res
      .status(200)
      .json(
        new ApiResponse({ message: "success", data: { country: countryArr } })
      );
  }),
};
