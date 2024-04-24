import express from "express";
import { isLoggedIn } from "../middlewares/isLogin.js";
import isAdmin from "../middlewares/isAdmin.js";
import {
  createColorController,
  getAllColorsController,
  getSingleColorController,
  deleteColorController,
  updateColorController,
} from "../controllers/colorController.js";

const colorsRouter = express.Router();

colorsRouter.post("/", isLoggedIn, isAdmin, createColorController);
colorsRouter.get("/", getAllColorsController);
colorsRouter.get("/:id", getSingleColorController);
colorsRouter.delete("/:id", isLoggedIn, isAdmin, deleteColorController);
colorsRouter.put("/:id", isLoggedIn, isAdmin, updateColorController);

export default colorsRouter;
