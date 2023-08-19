//@ts-check

import { Router } from "express";
import { cartController } from "../../controllers/carts.controller.js";

 
const cartsApiRouter = Router();

cartsApiRouter.get('/:cid', cartController.getCart)

cartsApiRouter.post('/', cartController.postCart);

cartsApiRouter.post('/:cid/products/:pid', cartController.postProductToCart);

cartsApiRouter.delete('/:cid/products/:pid', cartController.deleteProduct);

cartsApiRouter.delete('/:cid', cartController.deleteCart);

cartsApiRouter.put('/:cid', cartController.putCart);

cartsApiRouter.put('/:cid/products/:pid', cartController.putStock);

export default cartsApiRouter;
