//@ts-check
import express from 'express';
import { checkAdmin, checkUser, getSession } from '../../middlewares/auth.js';
import { homeController } from '../../controllers/home.controller.js';

 
const homeRouter = express.Router();


homeRouter.get("/", checkUser, getSession, homeController.getHome);

export default homeRouter;
  