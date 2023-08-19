import express from "express";
import passport from 'passport';
import { loginController } from "../../controllers/login.controller";

//@ts-check
const logoutRouter = express.Router();

logoutRouter.get('/logout', loginController.logout);
  
export default logoutRouter;