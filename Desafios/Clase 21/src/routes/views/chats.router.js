import express from "express";
import { chatController } from "../../controllers/chats.controller.js";

const chatsRouter = express.Router();

chatsRouter.get("/chat", chatController.getChat);

export default chatsRouter;