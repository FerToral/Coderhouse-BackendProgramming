//@ts-check
import express from "express";
import { cartService } from "../../utils/utils";
import { cartController } from "../../controllers/carts.controller";

const cartsRouter = express.Router();

cartsRouter.get('/carts/:cid', cartController.renderCart);

export default cartsRouter;