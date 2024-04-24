import Category from "../model/Category.js";
import asyncHandler from "express-async-handler";

//@desc Create new category
//@route POST /api/categories
//@access Private/Admin

export const createCategoryController = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //category exist
  const categoryFound = await Category.findOne({ name });
  if (categoryFound) {
    throw new Error("Category already exist");
  }
  //create new category
  const category = await Category.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });
  res.json({
    status: "success",
    message: "Category created successfully",
    category,
  });
});

//@desc Get all category
//@route Get /api/categories
//@access Public

export const getAllCategoriesController = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json({
    status: "success",
    message: "All category fetched successfully",
    categories,
  });
});

//@desc Get single category
//@route GET /api/categories/:id
//@access Public

export const getSingleCategoryController = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.json({
    status: "success",
    message: "Category fetched successfully",
    category,
  });
});

//@desc Update a category
//@route PUT /api/v1/categories/:id
//@access Private/Admin
export const updateCategoryController = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //update
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    { new: true }
  );
  //send response
  res.json({
    status: "success",
    message: "Category updated successfully!",
    category,
  });
});

//@desc Delete category
//@route DELETE /api/v1/categories/:id
//@access Private/Admin

export const deleteCategoryController = asyncHandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  //send a response
  res.json({
    status: "success",
    message: "Category deleted successfully!",
  });
});
