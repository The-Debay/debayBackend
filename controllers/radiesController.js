const { client } = require("../radies/radies");
const catchAsync = require("../utils/catchAsync");
const ApiResponse = require("../utils/responseSchema");

exports.addData = catchAsync( async ( req, res, next ) => {
    let data = req.body;
    console.log(data)
    let d = JSON.stringify(data)

    await client.set(data.id,d)

    res.status(200).json(new ApiResponse({message:"", data:{}}))
} )

exports.getData = catchAsync ( async (req, res, next) => {
    let id = req.params.id;
    let data  = await client.get(id);
    res.status(200).json(new ApiResponse({message:"success",data:{data}}))
} )