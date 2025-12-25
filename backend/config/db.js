import mongoose from "mongoose";

const connectDb = async () => {
  mongoose.connection.on("connected", () => console.log("db connected"));
  await mongoose.connect(`${process.env.MONGO_URI}/prescripto`);
};

export default connectDb;
