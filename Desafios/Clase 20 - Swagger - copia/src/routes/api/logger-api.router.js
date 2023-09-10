import { Router } from "express";
import { loggerController } from "../../controllers/logger.controller.js";

const loggerRouter = new Router();


loggerRouter.get('/', loggerController.loggerLevelsResponse);

export default loggerRouter;