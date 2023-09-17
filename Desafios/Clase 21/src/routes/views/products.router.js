//@ts-check
import express from 'express';
import { checkUser, getSession } from '../../middlewares/auth.js';
import { paginationMiddlewareViews } from '../../middlewares/mw-routerviews.js'; 
import { productController } from '../../controllers/products.controller.js';
 
const productsRouter = express.Router();


productsRouter.get("/realtimeproducts", checkUser, getSession, productController.renderRealTime);
  

productsRouter.get('/', checkUser, paginationMiddlewareViews,  getSession , productController.renderPaginationProducts);

productsRouter.get('/:pid', productController.renderProduct);
  

export default productsRouter;