import mongoose from "mongoose";
import productsData from "../models/products.model.js";
import {dbConnection} from "../databases/db.connection.js";
import dotenv from "dotenv";

dotenv.config();

let resultData;
let saveCounter = 0;
dbConnection
.then(() => console.log("mongodb connection success"))
.catch(error => console.log(error));
try{
   resultData = [{categoryId: 1, name: "product-1", price: 10, offerPrice: 0, desc: "product-1-description", code: "SKU:product-1", filename: "product-1.jpeg"},
   {categoryId: 2, name: "product-2", price: 12, offerPrice: 0, desc: "product-2-description", code: "SKU:product-2", filename: "product-2.jpeg"},
   {categoryId: 3, name: "product-3", price: 14, offerPrice: 0, desc: "product-3-description", code: "SKU:product-3", filename: "product-3.jpeg"},
   {categoryId: 1, name: "product-4", price: 16, offerPrice: 0, desc: "product-4-description", code: "SKU:product-4", filename: "product-4.jpeg"},
   {categoryId: 2, name: "product-5", price: 18, offerPrice: 0, desc: "product-5-description", code: "SKU:product-5", filename: "product-5.jpeg"},
   {categoryId: 3, name: "product-6", price: 20, offerPrice: 0,  desc: "product-6-description", code: "SKU:product-6", filename: "product-6.jpeg"},
   {categoryId: 1, name: "product-7", price: 22, offerPrice: 0,  desc: "product-7-description", code: "SKU:product-7", filename: "product-7.jpeg"},
   {categoryId: 2, name: "product-8", price: 24, offerPrice: 0,  desc: "product-8-description", code: "SKU:product-8", filename: "product-8.jpeg"},
   {categoryId: 3, name: "product-9", price: 26, offerPrice: 0,  desc: "product-9-description", code: "SKU:product-9", filename: "product-9.jpeg"},
   {categoryId: 1, name: "product-10", price: 28, offerPrice: 0,  desc: "product-10-description", code: "SKU:product-10", filename: "product-10.jpeg"},
   {categoryId: 2, name: "product-11", price: 30, offerPrice: 0,  desc: "product-11-description", code: "SKU:product-11", filename: "product-11.jpeg"},
   {categoryId: 3, name: "product-12", price: 32, offerPrice: 0,  desc: "product-12-description", code: "SKU:product-12", filename: "product-12.jpeg"},
   {categoryId: 1, name: "product-13", price: 34, offerPrice: 0,  desc: "product-13-description", code: "SKU:product-13", filename: "product-13.jpeg"},];
   
   for (let i = 0; i < resultData.length; i++) {
      let storeData = new productsData({
         categoryId: resultData[i].categoryId,
         name: resultData[i].name,
         filename: resultData[i].filename,
         price: resultData[i].price,
         desc: resultData[i].desc,
         code: resultData[i].code
      })
      storeData.save(() => {
      console.log("saved" + storeData)
      
      saveCounter++;
  
      if (saveCounter === resultData.length) {
         mongoose.disconnect()
         .then(() => console.log("saved succesfully and mongodb disconnected"))
         .catch(error => console.log(error));
         }
      });
   }
} catch (error) {
   console.log(error);
}