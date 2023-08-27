import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./src/routes/users.js";
import vehicleRoutes from "./src/routes/vehicle.js";
import brandRoutes from "./src/routes/brand.js";
import categoryRoutes from "./src/routes/category.js";
import productRoutes from "./src/routes/product.js";

import dotenv from "dotenv";

dotenv.config();

mongoose
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
const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '16mb'}));
app.use(bodyParser.urlencoded({limit: '16mb', extended: true}));
app.get("/ping", (req, res) => {
  return res.send({
    error: false,
    message: "Server is healthy",
  });
});

app.use("/users", authRoutes);
app.use("/vehicle", vehicleRoutes);
app.use("/brand", brandRoutes);
app.use("/category", categoryRoutes);
app.use("/products", productRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server started listening on PORT : " + process.env.PORT);
});