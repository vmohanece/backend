import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {encrypt} from "./utils.js";
dotenv.config();

const options = {
  expiresIn: "30d",
};

async function generateJwt(email, userId) {
  try {
    const payload = { email: email, id: userId };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, options);
    return { error: false, token: encrypt(token) };
  } catch (error) {
    return { error: true };
  }
}

export default generateJwt;