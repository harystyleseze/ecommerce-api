import User from "../model/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

//@desc Register user
//@route POST /api/v1/users/register
//@access Private/Admin (Only the developer of the app can register an admin)

export const registerUserController = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  //check if user exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    //throw
    throw new Error("User already exits");
  }
  //hash password
  const salt = await bcrypt.genSalt(10); //by convention pass 10
  const hashedPassword = await bcrypt.hash(password, salt);
  //create the user
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    status: "success",
    message: "User Registered Successfully",
    data: user,
  });
});

//@desc Login user
//@route POST /api/v1/users/login
//@access Public
export const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //find the user in the db by email only

  const userFound = await User.findOne({
    email,
  });
  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    res.json({
      status: "success",
      msg: "User Logged in successfully",
      userFound,
      //if user log in successfully, generate token
      token: generateToken(userFound?._id),
    });
  } else {
    throw new Error("Invalid login credentials");
  }
});

//@desc Get user profile
//@route GET /api/v1/users/profile
//@access Private
export const getUserProfileController = asyncHandler(async (req, res) => {
  //find the user
  const user = await User.findById(req.userAuthId).populate("orders");
  res.json({
    status: "success",
    message: "User profile fetched successfully",
    user,
  });
});

// //Get token from header
// const token = getTokenFromHeader(req);
// //Verify token from jwt
// const verified = verifyToken(token);
// //console.log(req);
// res.json({
//   status: "success",
//   message: "User profile fetched successfully",
//   user,
// });
//

//@desc Update user shippig address
//@route PUT /api/v1/users/update/shipping
//@access Private
export const updateShippingAddressController = asyncHandler(
  async (req, res) => {
    const { firstName, lastName, address, city, postalCode, province, phone } =
      req.body;
    const user = await User.findByIdAndUpdate(
      req.userAuthId,
      {
        shippingAddress: {
          firstName,
          lastName,
          address,
          city,
          postalCode,
          province,
          phone,
        },
        hasShippingAddress: true,
      },
      { new: true }
    );
    //send response
    res.json({
      status: "success",
      message: "Shipping address updated",
      user,
    });
  }
);
