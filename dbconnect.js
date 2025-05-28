import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Establishing connection
    const connection = await mongoose.connect(
      `${process.env.DB_CONNECTION_STRING}/${process.env.DB_NAME}`
    );
    console.log(`Database Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log("error @ dbconnect.js while connecting to db", error);
    process.exit(1);
  }
};

export default connectDB;
