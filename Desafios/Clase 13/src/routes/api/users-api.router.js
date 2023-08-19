//@ts-check
import express from 'express';
import { UserService } from '../../services/users.service.js';
import { validateFieldsUser } from '../../middlewares/mw-routerusers.js';
import { userController } from '../../controllers/users.controller.js';

export const usersApiRouter = express.Router();

const userService = new UserService();

usersApiRouter.get('/', userController.getUsers);

usersApiRouter.post('/', validateFieldsUser, userController.post );

usersApiRouter.delete('/:_id', userController.delete);

usersApiRouter.put('/:_id', userController.put);
