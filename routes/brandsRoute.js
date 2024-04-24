import express from "express";
import { isLoggedIn } from "../middlewares/isLogin.js";
import {
  createBrandController,
  getAllBrandsController,
  getSingleBrandController,
  deleteBrandController,
  updateBrandController,
} from "../controllers/brandController.js";
import isAdmin from "../middlewares/isAdmin.js";

const brandsRouter = express.Router();

brandsRouter.post("/", isLoggedIn, createBrandController);
brandsRouter.get("/", getAllBrandsController);
brandsRouter.get("/:id", getSingleBrandController);
brandsRouter.delete("/:id", isLoggedIn, isAdmin, deleteBrandController);
brandsRouter.put("/:id", isLoggedIn, isAdmin, updateBrandController);

export default brandsRouter;
