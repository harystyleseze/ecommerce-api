import express from "express";
import {
  createCouponController,
  deleteCouponsController,
  getAllCouponsController,
  getCouponController,
  updateCouponController,
} from "../controllers/couponsController.js";
import { isLoggedIn } from "../middlewares/isLogin.js";
import isAdmin from "../middlewares/isAdmin.js";
const couponsRouter = express.Router();

couponsRouter.post("/", isLoggedIn, isAdmin, createCouponController);
couponsRouter.get("/", getAllCouponsController);
couponsRouter.get("/:id", getCouponController);
couponsRouter.put("/:id", isLoggedIn, isAdmin, updateCouponController);
couponsRouter.delete("/:id", isLoggedIn, isAdmin, deleteCouponsController);
export default couponsRouter;
