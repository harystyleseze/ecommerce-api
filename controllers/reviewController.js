import Review from "../model/Review.js";
import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";
// @desc Create new review
// @route POST/ api/vi/reviews
// @access Private/Admin

export const createReviewController = asyncHandler(async (req, res) => {
  // destructure the request body
  const { product, message, rating } = req.body;

  //Find the product to review by id
  const { productID } = req.params;
  const productFound = await Product.findById(productID).populate("reviews");
  if (!productFound) {
    throw new Error("Product not found");
  }
  //check if user already reviewed this product
  const hasReviewed = productFound.reviews?.find((review) => {
    return review?.user?.toString() === req?.userAuthId?.toString();
  });
  //notify user if reviewed
  if (hasReviewed) {
    throw new Error("You have already reviewed this product");
  }
  //create review
  const review = await Review.create({
    message,
    rating,
    product: productFound?._id,
    user: req.userAuthId,
  });
  //push review into product Found
  productFound.reviews.push(review);
  //resave
  await productFound.save();
  res.status(201).json({
    success: true,
    message: "Review created Successfully",
  });
});
