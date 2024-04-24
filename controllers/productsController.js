import Product from "../model/Product.js";
import asyncHandler from "express-async-handler";
import Category from "../model/Category.js";
import Brand from "../model/Brand.js";
import upload from "../config/fileUpload.js";

//@desc Create new product
//@route POST /api/v1/products
//@access Private/Admin

export const createProductController = asyncHandler(async (req, res) => {
  //console.log(req.file);
  //res.send("file uploaded successfully");
  //const convertedImages = req.files.map((file) => file.path);
  const { name, description, category, sizes, colors, price, totalQty, brand } =
    req.body;
  //check if product already exist
  const productExists = await Product.findOne({ name });
  if (productExists) {
    throw new Error("Product Already Exists");
  }
  //check if brand already exist
  const brandExists = await Brand.findOne({ name });
  if (brandExists) {
    throw new Error("Brand Already Exists");
  }
  //find the brand
  const brandFound = await Brand.findOne({ name: brand });
  if (!brandFound) {
    throw new Error(
      "Brand not found, please create a brand first or check brand name!"
    );
  }

  //find the category
  const categoryFound = await Category.findOne({ name: category });
  if (!categoryFound) {
    throw new Error(
      "Category not found, please create a category first or check category name!"
    );
  }
  //Create the product
  const product = await Product.create({
    name,
    description,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
    brand,
    //images: convertedImages,
  });
  //Push the product created into category
  categoryFound.products.push(product._id);
  //resave category
  await categoryFound.save();
  //Push the product created into brand
  brandFound.products.push(product._id);
  //resave category
  await brandFound.save();
  //send response
  res.json({
    status: "success",
    message: "Product created successfully!",
    product, //product that was created
  });
});

//@desc Get all products
//@route POST /api/v1/products/
//@access Public

export const getProductsController = asyncHandler(async (req, res) => {
  //query all products
  let productQuery = Product.find();

  //filter product by name
  if (req.query.name) {
    productQuery = productQuery.find({
      name: { $regex: req.query.name, $options: "i" }, //intend to ignore uppercasing
    });
  }
  //Filter product by brand
  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: { $regex: req.query.brand, $options: "i" },
    });
  }
  //Filer product by category
  if (req.query.category) {
    productQuery = productQuery.find({
      category: { $regex: req.query.category, $options: "i" },
    });
  }
  //Filter by color
  if (req.query.colors) {
    productQuery = productQuery.find({
      colors: { $regex: req.query.colors, $options: "i" },
    });
  }
  //Filter product by size
  if (req.query.sizes) {
    productQuery = productQuery.find({
      sizes: { $regex: req.query.sizes, $options: "i" },
    });
  }
  //Filter product by price range
  if (req.query.price) {
    const priceRange = req.query.price.split("-");
    //gte: greteer or equal to
    //lte: less than or equal to
    productQuery = productQuery.find({
      price: { $gte: priceRange[0], $lte: priceRange[1] },
    });
  }
  //pagination
  //page
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  //limit - how many record to display
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
  //start index - starting point
  const startIndex = (page - 1) * limit;
  //end index - help to paginate
  const endIndex = page * limit;
  //total
  const total = await Product.countDocuments();
  productQuery = productQuery.skip(startIndex).limit(limit);
  //pagination result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  //await the query
  const products = await productQuery.populate("reviews");
  //send response
  res.json({
    status: "success",
    total,
    result: products.length,
    pagination,
    message: "Products fetched successfully!",
    products,
  });
});

//@desc Get one product
//@route GET /api/v1/products/:id
//@access Public

export const getProductController = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("reviews");
  //if no product found
  if (!product) {
    throw new Error("Product not found");
  }
  res.json({
    status: "success",
    message: "Product fetched successfully!",
    product,
  });
});

//@desc Update product
//@route PUT /api/v1/products/:id
//@access Private/Admin
export const updateProductController = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    brand,
  } = req.body;
  //update
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      category,
      sizes,
      colors,
      user,
      price,
      totalQty,
      brand,
    },
    { new: true }
  );
  //send response
  res.json({
    status: "success",
    message: "Product updated successfully!",
    product,
  });
});

//@desc Delete product
//@route DELETE /api/v1/products/:id
//@access Private/Admin

export const deleteProductController = asyncHandler(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  //send a response
  res.json({
    status: "success",
    message: "Product deleted successfully!",
  });
});
