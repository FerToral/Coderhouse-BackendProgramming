//@ts-check
import express from 'express';
import passport from 'passport';
import { registerController } from '../../controllers/register.controller.js';

const registerRouter = express.Router();


registerRouter.get('/', registerController.getRegisterForm);

//TODO PONER UNA BUENA RUTA DE ERROR
registerRouter.post('/', passport.authenticate('register', { failureRedirect: '/register/failregister' }), registerController.registerUser);

registerRouter.get('/failregister', registerController.failRegister);


export default registerRouter;