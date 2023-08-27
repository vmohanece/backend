import dotenv from "dotenv";
dotenv.config();
import categoryData from "../models/category.model.js";

export class CategoryData {
  getCategoryDetails  = async (req, res) => {
    try {
      const cData = await categoryData.find({ active: true });
      if(cData){
        return res.send({
          success: true,
          status: 200,
          message: "Success",
          data: cData,
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
const categoryController = new CategoryData();
export default categoryController;