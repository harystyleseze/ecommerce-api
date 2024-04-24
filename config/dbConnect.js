import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    //mongoose.set("strictQuery", false);
    const connected = await mongoose.connect(
      process.env.MONGO_URL
      // mongodb+srv://harrison:<password>@nodejs-ecommerce-api.x49fmtf.mongodb.net/?retryWrites=true&w=majority&appName=nodejs-ecommerce-api
    );

    console.log(`Mongodb connected ${connected.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    Process.exit(1);
  }
};

export default dbConnect;
//UQUHwHF4YzYaBj9H
