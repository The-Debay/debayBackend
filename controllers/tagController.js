const Tags = require("../models/tags");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { countryArr } = require("../utils/constant");
const { returnKeys } = require("../utils/functions");
const ApiResponse = require("../utils/responseSchema");
const AppError = require("../utils/appError");

module.exports = {
  createTag: catchAsync(async (req, res, next) => {
    let userId = req.userId
    let payload = req.body;
    let payloadData = returnKeys(payload,'name','description')
    let tag = await Tags.create({
      ...payloadData,
      userId
    });
    return res.status(201).json(
      new ApiResponse({
        message: "tag created successfully ",
        data: { tag },
      })
    );
  }),

  getAllTags:catchAsync( async (req, res, next) => {
    let tags = await Tags.findAll({});
      return res.status(200).json(
        new ApiResponse({
          message: "success",
          data: { tags },
        })
      );

  } ),

  getTag: catchAsync(async (req, res, next) => {
    let id = req.params.id;
    let tags = await Tags.findOne({
      where: {
        id:id,
      },
      include:[{
        model:User,
        as:"user",
        attributes:{ exclude:['password','isVerified','lastPasswordChange','created','updated']}
      }]
    });
    return res.status(200).json(
      new ApiResponse({
        message: "success ",
        data: { tags },
      })
    );
  }),

  deleteTag: catchAsync(async (req, res, next) => {
    let id = req.params.id;
    let userId = req.userId
    let tags = await Tags.destroy({
      where: {
        id:id,
        userId:userId
      }})
    return res.status(200).json(
      new ApiResponse({
        message: "tag deleted successfully ",
        data: { tags },
      })
    );
  }),

  updateTag: catchAsync(async (req, res, next) => {
    let payload = req.body;
    let userId = req.userId
    let tagId = req.params.id
   
    let payloadData = returnKeys(payload,'name','description')
    const tag = await Tags.findOne({
      where:{
        id:tagId,
      }
    })
    if(!tag) return next(new AppError('tag not exist', 400))
    if(tag.userId != userId) return next(new AppError(`you can't update the tag`, 400))
    await Tags.update(payloadData, {
      where: {
        id: tagId,
      },
    });
    return res.status(200).json( new ApiResponse({ message: "tag updated successfully ", data:{}}));
  }),
};
