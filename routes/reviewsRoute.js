import express from "express";
import { isLoggedIn } from "../middlewares/isLogin.js";
import { createReviewController } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/:productID", isLoggedIn, createReviewController);

export default reviewRouter;
