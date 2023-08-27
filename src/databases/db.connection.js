import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnection = mongoose
  .connect("mongodb://"+ process.env.MONGODB_HOST + ":" + parseInt(process.env.MONGODB_PORT) +"/"+ process.env.MONGODB_DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Database connection Success.");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });