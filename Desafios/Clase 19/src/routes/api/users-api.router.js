//@ts-check
import express from 'express';
import { validateFieldsUser } from '../../middlewares/mw-routerusers.js';
import { userController } from '../../controllers/users.controller.js';

export const usersApiRouter = express.Router();

usersApiRouter.get('/', userController.getUsers);

usersApiRouter.post('/', validateFieldsUser, userController.post );

usersApiRouter.delete('/:_id', userController.delete);

usersApiRouter.put('/:_id', userController.put);
