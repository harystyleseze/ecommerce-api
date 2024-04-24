import cloudinaryPackage from "cloudinary";
//import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const cloudinary = cloudinaryPackage.v2;

//configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Create storage engine for multer
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "Ecommerce-api",
//     allowed_formats: ["jpg", "png", "jpeg"],
//   },
// });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ["jpg", "png", "jpeg"],
  params: {
    folder: "Ecommerce-api",
  },
});

//Init multer with storage engine - receive the uploaded file
const upload = multer({
  storage: storage,
});

export default upload;
