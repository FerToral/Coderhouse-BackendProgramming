import express from "express";
import { loginController } from "../../controllers/login.controller.js";

//@ts-check
const logoutRouter = express.Router();

logoutRouter.get('/logout', loginController.logout);
  
export default logoutRouter;