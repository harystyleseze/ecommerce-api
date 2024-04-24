import express from "express";
import { isLoggedIn } from "../middlewares/isLogin.js";
import isAdmin from "../middlewares/isAdmin.js";
import {
  createOrderController,
  getSingleOrderController,
  updateOrderController,
  getOrderStatsController,
  getAllordersController,
} from "../controllers/orderController.js";
const orderRouter = express.Router();

orderRouter.post("/", isLoggedIn, createOrderController);
orderRouter.get("/", getAllordersController);
orderRouter.get("/sales/stats", isLoggedIn, getOrderStatsController);
orderRouter.put("/:id", isLoggedIn, isAdmin, updateOrderController);
orderRouter.get("/:id", isLoggedIn, isAdmin, getSingleOrderController);

export default orderRouter;
