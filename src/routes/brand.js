import express from "express";
import cleanBody from"../middlewares/cleanbody.js";
import validateToken from"../middlewares/validateToken.js";
import brandController from "../controllers/brand.controller.js";

const router = express.Router();

router.get("/", cleanBody, brandController.getBrandDetails);

export default router;