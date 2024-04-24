import User from "../model/User.js";

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userAuthId).lean();
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  if (user.isAdmin) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Access denied, admin only",
    });
  }
};

export default isAdmin;

// import User from "../model/User.js";

// const isAdmin = async (req, res, next) => {
//   //find the login user
//   const user = await User.findById(req.userAuthId).lean();
//   //check if admin
//   console.log(user);
//   if (user.isAdmin) {
//     next();
//   } else {
//     next(new Error("Access denied, admin only"));
//   }
// };
// export default isAdmin;
