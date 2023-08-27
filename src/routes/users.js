import express from "express";
import cleanBody from"../middlewares/cleanbody.js";
import validateToken from"../middlewares/validateToken.js";
import AuthController from"../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", cleanBody, AuthController.Signup);
router.get("/activate", cleanBody, AuthController.Activate);
router.post("/login", cleanBody, AuthController.Login);
router.patch("/forgot", cleanBody, AuthController.ForgotPassword);
router.patch("/reset", cleanBody, AuthController.ResetPassword);
router.get("/logout", validateToken, AuthController.Logout);
router.get("/profileDetails", validateToken, AuthController.getProfile);
router.put("/profileEdit", validateToken, AuthController.profileEdit);

export default router;