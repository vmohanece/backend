import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.model.js";
import vehicleData from "../models/vehicle.model.js";

export class VehicleData {
  getVehicleDetails  = async (req, res) => {
    try {
      const vData = await vehicleData.find({ active: true });
      if(vData){
        return res.send({
          success: true,
          status: 200,
          message: "Success",
          data: vData,
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
}
const vehicleController = new VehicleData();
export default vehicleController;