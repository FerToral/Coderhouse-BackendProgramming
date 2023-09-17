//@ts-check
import express from 'express';
import { checkAdmin, checkUser, getSession } from '../../middlewares/auth.js';
import { profileController } from '../../controllers/profile.controller.js';

const profileRouter = express.Router();


profileRouter.get('/profile', checkUser, getSession, profileController.getProfile);

export default profileRouter;