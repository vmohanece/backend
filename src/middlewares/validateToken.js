import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import {decrypt} from "../helpers/utils.js";

dotenv.config();
async function validateToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  let result;
  if (!authorizationHeader)
    return res.status(401).json({
      error: true,
      status: 401,
      message: "Access token is missing",
    });

  const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
  const options = {
    expiresIn: "30d",
  };
  try {
    let user = await User.findOne({
      accessToken: token,
    });
    if (!user) {
      result = {
        error: true,
        status: 403,
        message: `Authorization error`,
      };
      return res.status(403).json(result);
    }

    result = jwt.verify(decrypt(token), process.env.JWT_SECRET, options);

    if (!user.userId === result.id) {
      result = {
        error: true,
        status: 401,
        message: `Invalid token`,
      };

      return res.status(401).json(result);
    }

    req.decoded = result;
    next();
  } catch (err) {
    // console.log(err);
    if (err.name === "TokenExpiredError") {
      result = {
        error: true,
        status: 403,
        message: `TokenExpired`,
      };
    } else {
      result = {
        error: true,
        status: 403,
        message: `Authentication error`,
      };
    }
    return res.status(403).json(result);
  }
}

export default validateToken;