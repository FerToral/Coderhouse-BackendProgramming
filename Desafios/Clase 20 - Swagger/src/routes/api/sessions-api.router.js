//@ts-check
import express from 'express';
import { isAdmin, isUser } from '../../middlewares/auth.js';
import { sessionController } from '../../controllers/sessions.controller.js';

const sessionApiRouter = express.Router();


sessionApiRouter.get('/perfil', isUser, sessionController.getProfile);
  
sessionApiRouter.get('/administracion', isUser, isAdmin, sessionController.testAdmin);

sessionApiRouter.use('/current', sessionController.current);

export default sessionApiRouter;