const catchAsync = require("../utils/catchAsync");
const { countryArr } = require("../utils/constant");
const ApiResponse = require("../utils/responseSchema");



module.exports = {
  createProfile: catchAsync(async (req, res, next) => {
    let id = req.userId;
    let payload = req.body;
    let profile = await db.Profile.create({
      ...payload,
      userId: id,
    });
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
      attributes: { exclude: ["password"] },
      include: [
        {
          model: db.Profile,
          as: "profile",
          attributes: { exclude: ["userId"] },
        },
      ],
    });

    return res
      .status(201)
      .json(
        new ApiResponse({
          message: "profile created successfully ",
          data: { user },
        })
      );
  }),

  updateProfile: catchAsync(async (req, res, next) => {
    let id = req.userId;

    let user = await db.Profile.update(_.get(req, "body", {}), {
      where: {
        userId: id,
      },
    });
    return res
      .status(201)
      .json(
        new ApiResponse({ message: "profile updated successfully ", data: {} })
      );
  }),

  getAllCountries: catchAsync( async ( req, res, next ) => {
    res.status(200).json(new ApiResponse({message:'success',data:{country:countryArr}}))
  } )
};
