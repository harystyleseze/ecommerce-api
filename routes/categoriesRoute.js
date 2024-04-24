import express from "express";
import { isLoggedIn } from "../middlewares/isLogin.js";
import {
  createCategoryController,
  getAllCategoriesController,
  getSingleCategoryController,
  deleteCategoryController,
  updateCategoryController,
} from "../controllers/categoriesController.js";
import isAdmin from "../middlewares/isAdmin.js";

const categoriesRouter = express.Router();

categoriesRouter.post("/", isLoggedIn, createCategoryController);
categoriesRouter.get("/", getAllCategoriesController);
categoriesRouter.get("/:id", getSingleCategoryController);
categoriesRouter.delete("/:id", isLoggedIn, isAdmin, deleteCategoryController);
categoriesRouter.put("/:id", isLoggedIn, isAdmin, updateCategoryController);

export default categoriesRouter;
