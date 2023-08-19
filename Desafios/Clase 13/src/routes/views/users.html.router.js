import express from 'express';
import { UserModel } from '../../dao/models/users.model.js';
import { userController } from '../../controllers/users.controller.js';

export const usersHtmlRouter = express.Router();


usersHtmlRouter.get('/', userController.getUsersPagination);
