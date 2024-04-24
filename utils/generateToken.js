import jwt from "jsonwebtoken";

const generateToken = (id) => {
  //payload represent login user
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_KEY,
    { expiresIn: "3d" }
  );
};
export default generateToken;
