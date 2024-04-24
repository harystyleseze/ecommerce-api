import mongoose from "mongoose";
const Schema = mongoose.Schema;
//Generate random numbers and text for order
const randomTexts = Math.random().toString(36).substring(7).toUpperCase();
const randomNumbers = Math.floor(1000 + Math.random() * 90000);

// Create a schema for the user model
const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //represent the individual items,
    orderItems: [{ type: Object, required: true }],
    shippingAddress: {
      type: Object,
      required: true,
    },
    //generate rand string of order
    orderNumber: {
      type: String,
      default: randomTexts + randomNumbers,
    },
    //for Stripe Payment
    paymentStatus: {
      type: String,
      default: "Not Paid",
    },
    paymentMethod: {
      type: String,
      default: "Not specified",
    },
    totalPrice: {
      type: Number,
      default: 0.0,
    },
    currency: {
      type: String,
      default: "Not specified",
    },
    //for admin
    Status: {
      type: String,
      default: "pending",
      enum: ["pending", "processing", "shipped", "delivered"],
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

//compile to model
const Order = mongoose.model("Order", OrderSchema);
export default Order;
