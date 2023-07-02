import express from 'express';
import { UserModel } from '../dao/models/users.model.js';

export const loginRouter = express.Router();

const admin = {
  email: 'adminCoder@coder.com',
  password: 'adminCod3r123',
  admin: true,
  firstName: 'Admin',
  lastName: 'Coderhouse'
}

loginRouter.post('/register', async (req, res) => {
  const { firstName, lastName, age, email, password } = req.body;
  if (!firstName || !lastName || !age || !email || !password) {
    return res.status(400).render('error-page', { msg: 'faltan datos' });
  }
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

loginRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).render('error-page', { msg: 'faltan datos' });
  }
  try {
    const foundUser = await UserModel.findOne({ email });
    const limit = 10; 
    const page = 1; 
    const sort = 1;
    const query = 'true';

    if(foundUser){
      if(foundUser.password === password){
        req.session.firstName = foundUser.firstName;
        req.session.email = foundUser.email;
        req.session.admin = foundUser.admin;
      
        const queryParameters = `?limit=${limit}&page=${page}&sort=${sort}&query=${query}`;
        return res.redirect('/products' + queryParameters);
      }
    }else{
      if(email == admin.email && password == admin.password){
        req.session.firstName = admin.firstName;
        req.session.email = admin.email;
        req.session.admin = admin.admin;
        const queryParameters = `?limit=${limit}&page=${page}&sort=${sort}&query=${query}`;
        return res.redirect('/products' + queryParameters);
      }
    }
    return res.status(400).render('error-page', { msg: 'email o pass incorrectos' });
 
  } catch (e) {
    console.log(e);
    return res.status(500).render('error-page', { msg: 'error inesperado en servidor' });
  }
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
