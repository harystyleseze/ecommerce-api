import express from "express";
import { isLoggedIn } from "../middlewares/isLogin.js";
import isAdmin from "../middlewares/isAdmin.js";
import upload from "../config/fileUpload.js";
import {
  createProductController,
  getProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/productsController.js";

const productsRouter = express.Router();

productsRouter.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload.single("file"),
  createProductController
);
productsRouter.get("/", isLoggedIn, getProductsController);
productsRouter.get("/:id", getProductController);
productsRouter.put("/:id", isLoggedIn, isAdmin, updateProductController);
productsRouter.delete("/:id", isLoggedIn, isAdmin, deleteProductController);

export default productsRouter;
