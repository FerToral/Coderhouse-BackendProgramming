//@ts-check
import express from "express";
import { cartController } from "../../controllers/carts.controller.js";

const cartsRouter = express.Router();

cartsRouter.get('/carts/:cid', cartController.renderCart);

export default cartsRouter;