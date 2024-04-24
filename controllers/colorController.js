import Color from "../model/Colors.js";
import asyncHandler from "express-async-handler";

//@desc Create new Color
//@route POST /api/colors
//@access Private/Admin

export const createColorController = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //color exist
  const colorFound = await Color.findOne({ name });
  if (colorFound) {
    throw new Error("Color already exist");
  }
  //create new color
  const color = await Color.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });
  res.json({
    status: "success",
    message: "Color created successfully",
    color,
  });
});

//@desc Get all colors
//@route Get /api/colors
//@access Public

export const getAllColorsController = asyncHandler(async (req, res) => {
  const color = await Color.find();
  res.json({
    status: "success",
    message: "All color fetched successfully",
    color,
  });
});

//@desc Get single color
//@route GET /api/colors/:id
//@access Public

export const getSingleColorController = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);
  res.json({
    status: "success",
    message: "Color fetched successfully",
    color,
  });
});

//@desc Update a color
//@route PUT /api/v1/colors/:id
//@access Private/Admin
export const updateColorController = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //update
  const color = await Color.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    { new: true }
  );
  //send response
  res.json({
    status: "success",
    message: "Color updated successfully!",
    color,
  });
});

//@desc Delete color
//@route DELETE /api/v1/color/:id
//@access Private/Admin

export const deleteColorController = asyncHandler(async (req, res) => {
  await Color.findByIdAndDelete(req.params.id);
  //send a response
  res.json({
    status: "success",
    message: "Color deleted successfully!",
  });
});
