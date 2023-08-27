import express from "express";
import cleanBody from"../middlewares/cleanbody.js";
import validateToken from"../middlewares/validateToken.js";
import productsController from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", cleanBody, productsController.getproductDetails);
router.post("/rating", cleanBody, productsController.addProductReview);
router.put("/offerPrice", cleanBody, productsController.updateProductOffer); //admin update

export default router;