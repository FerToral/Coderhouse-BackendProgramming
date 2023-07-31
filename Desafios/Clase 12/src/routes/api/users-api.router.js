import express from 'express';
import { UserService } from '../../services/users.service.js';

export const usersRouter = express.Router();

const userService = new UserService();

usersRouter.get('/', async (req, res) => {
  try {
    const users = await userService.getAll();
    console.log(users);
    return res.status(200).json({
      status: 'success',
      msg: 'listado de usuarios',
      data: users,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

usersRouter.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, username, password, rol } = req.body;
    if (!email || !username || !password || !rol) {
			console.log(
				"validation error: please complete email, username, password and rol."
			);
			return res.status(400).json({
				status: "error",
				msg: "please complete email, username, password and rol.",
				payload: {},
			});
		}
    const userCreated = await userService.createOne({
      firstName, 
      lastName, 
      email,
      password,
      rol
    });
    return res.status(201).json({
      status: 'success',
      msg: 'user created',
      payload: {
				_id: userCreated._id,
				email: userCreated.email,
				username: userCreated.username,
				password: userCreated.password,
				rol: userCreated.rol,
			},
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      payload: {},
    });
  }
});

usersRouter.delete('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const result = await userService.deleteOne(_id);

		if (result?.deletedCount > 0) {
			return res.status(200).json({
				status: "success",
				msg: "user deleted",
				payload: {},
			});
		} else {
			return res.status(404).json({
				status: "error",
				msg: "user not found",
				payload: {},
			});
		}
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			status: "error",
			msg: "something went wrong :(",
			payload: {},
		});
	}
});

usersRouter.put('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const { firstName, lastName, email, username, password, rol } = req.body;

    if (!email || !username || !password || !rol || !_id) {
			console.log(
				"validation error: please complete email, username, password and rol."
			);
			return res.status(400).json({
				status: "error",
				msg: "please complete email, username, password and rol.",
				payload: {},
			});
		}

    const userUptaded = await userService.updateOne({
      _id,
      email,
      username,
      password,
      rol,
    });

    console.log(userUptaded);
    if (userUptaded.matchedCount > 0) {
      return res.status(201).json({
        status: "success",
        msg: "user uptaded",
        payload: {},
      });
    } else {
      return res.status(404).json({
        status: "error",
        msg: "user not found",
        payload: {},
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});
