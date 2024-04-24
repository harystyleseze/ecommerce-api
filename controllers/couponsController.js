import Coupon from "../model/Coupon.js";
import asyncHandler from "express-async-handler";

//@desc Create new Coupon
//@route POST api/v1/coupons
//@access Private/Admin

export const createCouponController = asyncHandler(async (req, res) => {
  const { code, startDate, endDate, discount, user } = req.body;
  //Check if user is admin
  //Check if coupon already exists
  const couponExists = await Coupon.findOne({
    code,
  });
  if (couponExists) {
    throw new Error("Coupon already exists");
  }
  //Check if discount is a number
  if (isNaN(discount)) {
    throw new Error("Discount value must be a number");
  }
  //Create the coupon
  const coupon = await Coupon.create({
    code,
    startDate,
    endDate,
    discount,
    user: req.userAuthId,
  });
  //send the response
  res.json({
    status: "success",
    message: "Coupon created successfully",
    coupon,
  });
});

//@desc Get all coupons
//@route Get api/v1/coupons
//@access Public

export const getAllCouponsController = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find();
  res.status(200).json({
    status: "success",
    message: "All coupons founds successfully",
    coupons,
  });
});

//@desc Get a coupon
//@route Get api/v1/coupons/:id
//@access Public

export const getCouponController = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  res.json({
    status: "success",
    message: "Coupon fetched successfully",
    coupon,
  });
});

//@desc Update a coupon
//@route PUT api/v1/coupons/:id
//@access Public
export const updateCouponController = asyncHandler(async (req, res) => {
  const { code, startDate, endDate, discount } = req.body;
  const coupon = await Coupon.findByIdAndUpdate(
    req.params.id,
    {
      code: code?.toUpperCase(),
      discount,
      startDate,
      endDate,
    },
    { new: true }
  );
  res.json({
    status: "Success",
    message: "Coupon updated successfully",
    coupon,
  });
});

//@desc Delete all coupons
//@route DELETE api/v1/coupons/delete/:id
//@access Private/Admin
export const deleteCouponsController = asyncHandler(async (req, res) => {
  await Coupon.findByIdAndDelete(req.params.id);
  res.json({
    status: "Success",
    message: "Coupon deleted successfully",
  });
});
