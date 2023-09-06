import express from "express";
import passport from 'passport';
import { loginController } from "../../controllers/login.controller.js";

const loginRouter = express.Router();

loginRouter.get('/', loginController.renderLoginPage);
  
loginRouter.post('/', passport.authenticate('login', { failureRedirect: '/login/faillogin' }), loginController.authenticateLogin);
  
loginRouter.get('/faillogin', loginController.renderFailLoginPage);
//TODO Si ya tenes un inicio de sesion, destruilo para iniciar con gitHub
loginRouter.get('/github', loginController.renderGithubLoginPage);
  
export default loginRouter;