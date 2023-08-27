import mongoose from "mongoose";
import vehicleData from "../models/vehicle.model.js";
import {dbConnection} from "../databases/db.connection.js";
import dotenv from "dotenv";

dotenv.config();

let resultData;
let saveCounter = 0;
dbConnection
.then(() => console.log("mongodb connection success"))
.catch(error => console.log(error));
try{
   resultData = [{id: 1, name: "Car1", model: "model1", brand: "BMW"},
   {id: 2, name: "Car2", model: "model2", brand: "BMW"},
   {id: 3, name: "Car3", model: "model3", brand: "Audi"},
   {id: 4, name: "Car4", model: "model4", brand: "Maruti"},
   {id: 5, name: "Car5", model: "model5", brand: "Ford"},
   {id: 6, name: "Car6", model: "model6", brand: "Honda"},
   {id: 7, name: "Car7", model: "model7", brand: "Ford"},
   {id: 8, name: "Car8", model: "model8", brand: "Honda"},
   {id: 9, name: "Car9", model: "model9", brand: "Maruti"}];
   for (let i = 0; i < resultData.length; i++) {
      let storeVehicleData = new vehicleData({
         id: resultData[i].id,
         name: resultData[i].name,
         model: resultData[i].model,
         brand: resultData[i].brand
      })
      storeVehicleData.save(() => {
      console.log("saved" + storeVehicleData)
      
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