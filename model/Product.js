import mongoose from "mongoose";
//product schema
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      ref: "Category",
      required: true,
    },
    sizes: {
      type: [String],
      enum: ["S", "M", "L", "XL", "XXL"],
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", //reference the User model
    },
    images: [
      //array
      {
        type: String,
        default: "https://via.placeholder.com/150",
      },
    ],
    reviews: [
      //array
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "Review",
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    totalQty: {
      type: Number,
      required: true,
    },
    totalSold: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, //autogenerated
    toJSON: { virtuals: true }, //allow to populate id's into real object
  }
);
//Virtuals - access the data from the document as properties
//quantity left
ProductSchema.virtual("quantityLeft").get(function () {
  const product = this;
  return product?.totalQty - product?.totalSold;
});

//Calculate total rating
ProductSchema.virtual("totalReviews").get(function () {
  //virtual method -- enables us to call this.totalReviews
  //console.log("this", this); //this --represents the current document/instance being fetched (for a product)
  const product = this;
  return product?.reviews?.length; //returns the length of the array of reviews
});
//Average Rating
ProductSchema.virtual("averageRating").get(function () {
  let ratingsTotal = 0;
  const product = this;
  product?.reviews?.forEach((review) => {
    ratingsTotal += review?.rating;
  });
  //calculate average rating
  const averageRating = Number(ratingsTotal / product?.reviews?.length).toFixed(
    2
  );
  return averageRating;
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
