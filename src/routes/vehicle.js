import express from "express";
import cleanBody from"../middlewares/cleanbody.js";
import validateToken from"../middlewares/validateToken.js";
import vehicleController from "../controllers/vehicle.controller.js";

const router = express.Router();

router.get("/", cleanBody, vehicleController.getVehicleDetails);

export default router;