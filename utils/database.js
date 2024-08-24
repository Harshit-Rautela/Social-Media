import mongoose from "mongoose";

let isConnected = false;
const MongoDBURI = process.env.MONGODB_URI;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    await mongoose.connect(MongoDBURI);
    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error.message);
  }
};
