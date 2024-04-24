import Order from "../model/Order.js";
import asyncHandler from "express-async-handler";
import User from "../model/User.js";
import Product from "../model/Product.js";
//import Stripe from "stripe";

//stripe
//const stripe = new Stripe(process.env.STRIPE_KEY);

//@desc create orders
//@route POST /api/orders
//@access Private

export const createOrderController = asyncHandler(async (req, res) => {
  //Get the payload - the things required to create the order
  const { orderItems, shippingAddress, totalPrice } = req.body;

  //find the user
  const user = await User.findById(req.userAuthId);
  //check if user has shipping address
  if (!user?.hasShippingAddress) {
    throw new Error("Please provide a shipping address");
  }

  //check of order is not empty
  if (orderItems?.length <= 0) {
    throw new Error("No order Items");
  }
  //place the order and save it to the database
  const order = await Order.create({
    user: user?._id,
    orderItems,
    shippingAddress,
    totalPrice,
  });

  //Update the product quantity and quantity sold
  //first find the product(s)
  const products = await Product.find({ _id: { $in: orderItems } });
  orderItems?.map(async (order) => {
    const product = products?.find((product) => {
      return product?._id?.toString() === order?._id?.toString();
    });
    if (product) {
      product.totalSold += order.totalQtyBuying;
    }
    await product.save();
  });
  //push order into user orders
  user.orders.push(order?._id);
  await user.save();

  //make payment(stripe)--on hold
  //conver order items to have same structure that strip need
  //   const convertedOrders = orderItems.map((item) => {
  //     return {
  //       price_data: {
  //         currency: "usd",
  //         product_data: {
  //           name: item.name,
  //           description: item.description,
  //         },
  //         unit_amount: item?.price * 100,
  //       },
  //       quantity: item?.totalQtyBuying,
  //     };
  //   });
  //create session for stripe - this displays the payment form
  //   const session = await stripe.checkout.sessions.create({
  //     //details of the order
  //     line_items: convertedOrders,
  //     mode: "payment",
  //     success_url: "http://localhost:3000/success",
  //     cancel_url: "http://localhost:3000/cancel",
  //   });
  //   res.send({ url: session.url });
  //payment webhook
  //update the user order
  res.json({
    success: true,
    message: "Order created",
    order,
    user,
  });
});
//@desc get all orders
//@route GET /api/v1/orders
//@access private

export const getAllordersController = asyncHandler(async (req, res) => {
  //find all orders
  const orders = await Order.find().populate("user");
  res.json({
    success: true,
    message: "All orders fetched successfully",
    orders,
  });
});
//@desc get single order
//@route GET /api/v1/orders/:id
//@access private/admin

export const getSingleOrderController = asyncHandler(async (req, res) => {
  //get the id from params
  const id = req.params.id;
  const order = await Order.findById(id);
  //send response
  res.status(200).json({
    success: true,
    message: "Single order fetched successfully",
    order,
  });
});

//@desc update order to delivered
//@route PUT /api/v1/orders/update/:id
//@access private/admin

//for admin - to only update the status of the order
export const updateOrderController = asyncHandler(async (req, res) => {
  //get the id from params
  const id = req.params.id;
  const { Status } = req.body;
  //update
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    {
      Status: Status,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
    updatedOrder,
  });
});

//@desc get sales sum of orders
//@route GET /api/v1/orders/sales/sum
//@access private/admin

export const getOrderStatsController = asyncHandler(async (req, res) => {
  //get order stats
  const orders = await Order.aggregate([
    {
      $group: {
        _id: null,
        minimumSale: {
          $min: "$totalPrice",
        },
        totalSales: {
          $sum: "$totalPrice",
        },
        maximumSale: {
          $max: "$totalPrice",
        },
        averageSale: {
          $avg: "$totalPrice",
        },
      },
    },
  ]);
  //get the date
  const date = new Date(); //today's date

  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const saleToday = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: today,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: {
          $sum: "$totalPrice",
        },
      },
    },
  ]);
  //send response
  res.status(200).json({
    success: true,
    message: "Sum of orders",
    orders,
    saleToday,
  });
});

//@desc get sales sum of orders
//@route GET /api/v1/orders/sales/sum/month
//@access private/admin

export const getMonthSalesController = asyncHandler(async (req, res) => {});
