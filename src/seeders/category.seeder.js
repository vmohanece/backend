import mongoose from "mongoose";
import categoryData from "../models/category.model.js";
import {dbConnection} from "../databases/db.connection.js";
import dotenv from "dotenv";

dotenv.config();

let resultData;
let saveCounter = 0;
dbConnection
.then(() => console.log("mongodb connection success"))
.catch(error => console.log(error));
try{
   resultData = [{id: 1, name: "Power Tools"},
   {id: 2, name: "Hand Tools"},
   {id: 3, name: "Pluming"}];
   for (let i = 0; i < resultData.length; i++) {
      let storeData = new categoryData({
         id: resultData[i].id,
         name: resultData[i].name
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