import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.model.js";
import productsData from "../models/products.model.js";
import productRatingData from "../models/productRating.model.js";
import {productReviewSchema, productUpdateSchema} from "../validations/product.validation.js";

export class ProductsData {
  getproductDetails  = async (req, res) => {
    try {
      const Data = await productsData.find({ active: true });
      if(Data){
        return res.send({
          success: true,
          status: 200,
          message: "Success",
          data: Data,
        });
      }
      return res.send({
        success: false,
        status: 400,
        message: "Fail",
        data: [],
      });
    }
    catch (error) {
      return res.status(500).json({
        error: true,
        status: 500,
        message: "Error fetching data",
      });
    }
  };

  addProductReview  = async (req, res) => {
    try {
      const tokenDetails = req.decoded;
      const uid = tokenDetails.id;
      let user = await User.findOne({ userId: uid, active:true });
      if(!user){
        return res.status(404).json({
          error: true,
          status: 404,
          message: "Invalid username, please try with a valid username",
        });
      }
      const result = productReviewSchema.validate(req.body);
      if (result.error) {
        return res.json({
        error: true,
        status: 400,
        message: result.error.message,
        });
      }
      const Data = await productsData.find({ _id: result.value.id, active: true });
      const checkExists = await productRatingData.find({ _id: result.value.id, userId: uid, active: true });
      
      if(!Data && checkExists.length > 0){
        return res.send({
          success: false,
          status: 404,
          message: "Record not found / already review has been added",
        });
      }
     
      result.value.userId = uid;
      result.value.productId = result.value.id;
      const newReview = new productRatingData(result.value);
      const rating = await newReview.save();
      if(!rating){
        return res.status(400).json({
          success: false,
          status: 400,
          message: "failed to add rating"
        });
      }
      return res.status(200).json({
        success: true,
        status: 200,
        message: "Rating added successfully"
      });
    }
    catch (error) {
      return res.status(500).json({
        error: true,
        status: 500,
        message: "Error adding rating",
      });
    }
  };

  updateProductOffer = async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
      if(process.env.ADMIN_TOKEN != token){
        return res.status(404).json({
          error: true,
          status: 404,
          message: "Invalid username, please try with a valid username",
        });
      }
      const result = productUpdateSchema.validate(req.body);
      if (result.error) {
        return res.json({
        error: true,
        status: 400,
        message: result.error.message,
        });
      }
      const Data = await productsData.find({ _id: result.value.id, active: true });

      if(Data.length == 0){
        return res.send({
          success: false,
          status: 404,
          message: "Record not found",
        });
      }
     
      let offerPrice = result.value.offerPrice;
      const productUpdate = await productsData.findOneAndUpdate({ _id: result.value.id }, {offerPrice});
      if(!productUpdate){
        return res.status(400).json({
          success: false,
          status: 400,
          message: "failed to update offer price"
        });
      }
      return res.status(200).json({
        success: true,
        status: 200,
        message: "Offer price updated successfully"
      });
    }
    catch (error) {
      return res.status(500).json({
        error: true,
        status: 500,
        message: "Error updating Offer price",
      });
    }
  };
}
const productsController = new ProductsData();
export default productsController;