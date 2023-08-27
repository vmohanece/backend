import express from "express";
import cleanBody from"../middlewares/cleanbody.js";
import validateToken from"../middlewares/validateToken.js";
import categoryController from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", cleanBody, categoryController.getCategoryDetails);

export default router;