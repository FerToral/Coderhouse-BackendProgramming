import express from 'express';
import { UserModel } from '../dao/models/users.model.js';
import { authenticateUser, validateFields } from '../middlewares/mw-routerlogin.js';

export const loginRouter = express.Router();

 

loginRouter.post('/register', validateFields, async (req, res) => {
  
  try {
    await UserModel.create({ firstName, lastName, age, email, password, admin: false });
    req.session.firstName = firstName;
    req.session.email = email;
    req.session.admin = false;
    return res.redirect('/profile');
  } catch (e) {
    console.log(e);
    return res.status(400).render('error-page', { msg: 'controla tu email y intenta mas tarde' });
  }
});


loginRouter.post('/login', validateFields, authenticateUser, (req, res) => {
  return res.redirect(req.redirectUrl);
});


/* 
loginRouter.get('/', async (req, res) => {
  try {
    const users = await Service.getAll();
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

loginRouter.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const userCreated = await Service.createOne(firstName, lastName, email);
    return res.status(201).json({
      status: 'success',
      msg: 'user created',
      data: userCreated,
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

loginRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    //TODO LLAMAR A OTA FUNCION
    return res.status(200).json({
      status: 'success',
      msg: 'user deleted',
      data: {},
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

loginRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    //TODO LLAMAR A OTRA FUNCION
    return res.status(201).json({
      status: 'success',
      msg: 'user uptaded',
      data: { _id: id, firstName, lastName, email },
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
 */
