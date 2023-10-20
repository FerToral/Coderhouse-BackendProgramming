import { Router } from "express";
import { productController } from "../../controllers/products.controller.js";

const mockingRouter = Router()


mockingRouter.get('/', productController.mockingPorduct);

export default mockingRouter;