import dotenv from "dotenv";
import generateJwt from "../helpers/generateJwt.js";
import sendEmail from "../helpers/mailer.js";
import User, {hashPassword, comparePasswords} from "../models/user.model.js";
import {userSchema,login,editProfile} from "../validations/user.validation.js";
import { uuid } from "uuidv4";
dotenv.config();

export class UserController{
  profileEdit = async (req, res) => {
    const tokenDetails = req.decoded;
    const uid = tokenDetails.id;
    
    try {
      const result = editProfile.validate(req.body);
      if (result.error) {
        return res.json({
        error: true,
        status: 400,
        message: result.error.message,
        });
      }
      let user = await User.findOne({ userId: uid, active:true });
      if(!user){
        return res.status(404).json({
          error: true,
          status: 404,
          message: "Invalid username, please try with a valid username",
        });
      }
      const profileStatus = await User.findOneAndUpdate({ userId: uid }, result.value);
      
      if(profileStatus){
        return res.status(200).json({
          success: true,
          status: 200,
          message: "Profile update successfully",
        });
      }
      return res.status(200).json({
        success: false,
        status: 400,
        message: "fail to upfate profile",
      });
    }catch (err) {
      return res.status(500).json({
      error: true,
      status: 500,
      message: "Error updating profile",
      });
  
    };
  };
  
  getProfile = async (req, res) => {
    try {
      const tokenDetails = req.decoded;
      const uid = tokenDetails.id;
      let user = await User.findOne({ userId: uid, active:true }).select({"password": 0,"emailTokenExpires":0,
      "emailToken":0,"accessToken":0, "resetPasswordToken":0, "resetPasswordExpires": 0});
      if(!user){
        return res.status(404).json({
          error: true,
          status: 404,
          message: "Invalid username, please try with a valid username",
        });
      }
      const result = { user }
      return res.send({
        success: true,
        status: 200,
        message: "Success",
        profileData: user
      });
       
    } catch (err) {
        console.log(err);
        return res.status(500).json({
        error: true,
        status: 500,
        message: "Error getting profile",
        });
  
    }
  };
  
  Signup = async (req, res) => {
    try {
      let tokenRes = "";
      const result = userSchema.validate(req.body);
      if (result.error) {
        return res.json({
          error: true,
          status: 400,
          message: result.error.message,
        });
      }
      
      //Check if the email has been already registered.
      var user = await User.findOne({
        email: result.value.email
      });
      if (user) {
        return res.json({
          error: true,
          status: 409,
          message: "Email is already in use",
        });
      }
         
      const id = uuid(); //Generate unique id for the user.
      result.value.active = true;
      const { error, token } = await generateJwt(result.value.email, id);
        if (error) {
          return res.status(500).json({
            error: true,
            status: 500,
            message: "Couldn't create access token. Please try again later",
          });
        }
      tokenRes = token;
      result.value.accessToken = token;
      result.value.userId = id;
      result.value.active = false;
      const hash = await hashPassword(result.value.password);
      /*delete result.value.confirmPassword;*/
      result.value.password = hash;

      let code = Math.floor(100000 + Math.random() * 900000);
      let expiry = Date.now() + 60 * 1000 * 15; //15 mins in ms
      
      const sendCode = await sendEmail(result.value.name, result.value.email, code, "Registration");

      if (sendCode.error) {
        return res.status(500).json({
          error: true,
          status: 500,
          message: "Couldn't send verification email.",
        });
      }
      result.value.emailToken = code;
      result.value.emailTokenExpires = new Date(expiry);
  
      const newUser = new User(result.value);
      await newUser.save();
  
      return res.status(200).json({
        success: true,
        status: 200,
        message: "Registration Success"
      });
    } catch (error) {
      console.error("signup-error", error);
      return res.status(500).json({
        error: true,
        status: 500,
        message: "Cannot Register",
      });
    }
  };
  
  Activate = async (req, res) => {
    try {
      const email = req.query.email;
      const code = req.query.code;
      if (!email || !code) {
        return res.json({
          error: true,
          status: 400,
          message: "Please make a valid request",
        });
      }
      const user = await User.findOne({
        email: email,
        emailToken: code,
        emailTokenExpires: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({
          error: true,
          message: "Invalid details",
        });
      } else {
        if (user.active)
          return res.send({
            error: true,
            message: "Account already activated",
            status: 400,
          });
  
        user.emailToken = "";
        user.emailTokenExpires = null;
        user.active = true;
  
        await user.save();
  
        return res.status(200).json({
          success: true,
          message: "Account activated.",
        });
      }
    } catch (error) {
      console.error("activation-error", error);
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  };
  
  Login = async (req, res) => {
    try {
      const result = login.validate(req.body);
      if (result.error) {
        return res.json({
          error: true,
          status: 400,
          message: result.error.message,
        });
      }
      
      const { email, password } = req.body;
  
      //1. Find if any account with that email exists in DB
      const user = await User.findOne({ email: email });
  
      // NOT FOUND - Throw error
      if (!user) {
        return res.status(404).json({
          error: true,
          status: 404,
          message: "Account not found",
        });
      }
  
      //2. Throw error if account is not activated
      if (!user.active) {
        return res.status(400).json({
          error: true,
          status: 400,
          message: "You must verify your email to activate your account",
        });
      }
  
      //3. Verify the password is valid
      const isValid = await comparePasswords(password, user.password);
  
        if (!isValid) {
          return res.status(400).json({
            error: true,
            status: 400,
            message: "Wrong password, please try with the correct password.",
          });
        }
  
      //Generate Access token
  
      const { error, token } = await generateJwt(user.email, user.userId);
      if (error) {
        return res.status(500).json({
          error: true,
          status: 500,
          message: "Couldn't create access token. Please try again later",
        });
      }
      user.accessToken = token;
      await user.save();
  
      //Success
      return res.send({
        success: true,
        status: 200,
        message: "User logged in successfully",
        accessToken: token,
      });
    } catch (err) {
      console.error("Login error", err);
      return res.status(500).json({
        error: true,
        status: 500,
        message: "Couldn't login. Please try again later.",
      });
    }
  };
  
  ForgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.send({
          status: 400,
          error: true,
          message: "Cannot be processed",
        });
      }
      const user = await User.findOne({
        email: email,
      });
      if (!user) {
        return res.send({
          success: true,
          status: 400,
          message:
            "Email doesn't match with our records/You might have been used Google Sign-in",
        });
      }
  
      let code = Math.floor(100000 + Math.random() * 900000);
      let response = await sendEmail(user.name, user.email, code, "ResetPassword");
  
      if (response.error) {
        return res.status(500).json({
          error: true,
          status: 500,
          message: "Couldn't send mail. Please try again later.",
        });
      }
  
      let expiry = Date.now() + 60 * 1000 * 15;
      user.resetPasswordToken = code;
      user.resetPasswordExpires = expiry; // 15 minutes
  
      await user.save();
  
      return res.send({
        success: true,
        status: 200,
        message:
          "If that email address is in our database, we will send you an email to reset your password",
      });
    } catch (error) {
      console.error("forgot-password-error", error);
      return res.status(500).json({
        error: true,
        status: 500,
        message: error.message,
      });
    }
  };
  
  ResetPassword = async (req, res) => {
    try {
      const { token, newPassword, confirmPassword } = req.body;
      if (!token || !newPassword || !confirmPassword) {
        return res.status(403).json({
          error: true,
          status: 403,
          message:
            "Couldn't process request. Please provide all mandatory fields",
        });
      }
      const user = await User.findOne({
        resetPasswordToken: req.body.token,
        resetPasswordExpires: { $gt: Date.now() },
      });
      if (!user) {
        return res.send({
          error: true,
          status: 200,
          message: "Password reset token is invalid or has expired.",
        });
      }
      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          error: true,
          status: 400,
          message: "Passwords didn't match",
        });
      }
      const hash = await User.hashPassword(req.body.newPassword);
      user.password = hash;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = "";
  
      await user.save();
  
      return res.send({
        success: true,
        status: 200,
        message: "Password has been changed",
      });
    } catch (error) {
      console.error("reset-password-error", error);
      return res.status(500).json({
        error: true,
        status: 500,
        message: error.message,
      });
    }
  };
  
  Logout = async (req, res) => {
    try {
      const { id } = req.decoded;
  
      let user = await User.findOne({ userId: id });
  
      user.accessToken = "";
  
      await user.save();
  
      return res.send({ success: true, message: "User Logged out" });
    } catch (error) {
      console.error("user-logout-error", error);
      return res.status(500).json({
        error: true,
        status: 500,
        message: error.message,
      });
    }
  };
}

const userController = new UserController();
export default userController;