import dotenv from "dotenv";
import express from "express";
import dbConnect from "../config/dbConnect.js";
import {
  globalErrorHandler,
  notFound,
} from "../middlewares/globalErrorHandler.js";
import productsRouter from "../routes/productsRoute.js";
import userRouter from "../routes/usersRoute.js";
import categoriesRouter from "../routes/categoriesRoute.js";
import brandsRouter from "../routes/brandsRoute.js";
import colorsRouter from "../routes/colorsRoute.js";
import reviewRouter from "../routes/reviewsRoute.js";
import orderRouter from "../routes/ordersRoute.js";
import couponsRouter from "../routes/couponsRoute.js";
//config .env
dotenv.config();
//db connect
dbConnect();
//create instance of express as const
//functions are first class citizen therefore, you can assign them to a variable

const app = express();
//pass incoming data
app.use(express.json());

//check and use the Routes
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/products/", productsRouter);
app.use("/api/v1/categories/", categoriesRouter);
app.use("/api/v1/brands/", brandsRouter);
app.use("/api/v1/colors/", colorsRouter);
app.use("/api/v1/reviews/", reviewRouter);
app.use("/api/v1/orders/", orderRouter);
app.use("/api/v1/coupons/", couponsRouter);
//404 error middleware
app.use(notFound);
//error middleware -- below the route
app.use(globalErrorHandler);
export default app; //exposes the app to be used in other files
