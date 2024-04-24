import Brand from "../model/Brand.js";
import asyncHandler from "express-async-handler";

//@desc Create new Brand
//@route POST /api/brands
//@access Private/Admin

export const createBrandController = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //brand exist
  const brandFound = await Brand.findOne({ name });
  if (brandFound) {
    throw new Error("Brand already exist");
  }
  //create new brand
  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });
  res.json({
    status: "success",
    message: "Brand created successfully",
    brand,
  });
});

//@desc Get all brands
//@route Get /api/brands
//@access Public

export const getAllBrandsController = asyncHandler(async (req, res) => {
  const brand = await Brand.find();
  res.json({
    status: "success",
    message: "All brand fetched successfully",
    brand,
  });
});

//@desc Get single brand
//@route GET /api/brands/:id
//@access Public

export const getSingleBrandController = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  res.json({
    status: "success",
    message: "Brand fetched successfully",
    brand,
  });
});

//@desc Update a brand
//@route PUT /api/v1/brands/:id
//@access Private/Admin
export const updateBrandController = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //update
  const brand = await Brand.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    { new: true }
  );
  //send response
  res.json({
    status: "success",
    message: "Brand updated successfully!",
    brand,
  });
});

//@desc Delete brand
//@route DELETE /api/v1/brand/:id
//@access Private/Admin

export const deleteBrandController = asyncHandler(async (req, res) => {
  await Brand.findByIdAndDelete(req.params.id);
  //send a response
  res.json({
    status: "success",
    message: "Brand deleted successfully!",
  });
});
