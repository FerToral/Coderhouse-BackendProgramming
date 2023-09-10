//@ts-check

import { UserModel } from "../dao/models/users.model.js";

const admin = {
  email: 'adminCoder@coder.com',
  password: 'adminCod3r123',
  admin: true,
  firstName: 'Admin',
  lastName: 'Coderhouse'
}
// Middleware para validar los campos email y password
export const validateFields = (req, res, next) => {
    const allValuesExist = Object.values(req.body).every(value => !!value);
  
    if (!allValuesExist) {
      return res.status(400).render('error-page', { msg: 'Missing data' });
    }
  
    next();
};
  
  
  // Middleware para autenticar al usuario o administrador
export const authenticateUser = async (req, res, next) => {
    const { email, password } = req.body;
    const limit = 10;
    const page = 1;
    const sort = 1;
    const query = 'true';
  
    try {
      const foundUser = await UserModel.findOne({ email });
  
      if (foundUser && foundUser.password === password) {
        req.session.firstName = foundUser.firstName;
        req.session.email = foundUser.email;
        req.session.admin = foundUser.admin;
      } else if (email === admin.email && password === admin.password) {
        req.session.firstName = admin.firstName;
        req.session.email = admin.email;
        req.session.admin = admin.admin;
      } else {
        return res.status(400).render('error-page', { msg: 'email o pass incorrectos' });
      }
  
      const queryParameters = `?limit=${limit}&page=${page}&sort=${sort}&query=${query}`;
      req.redirectUrl = '/products' + queryParameters;
      next();
    } catch (e) {
      console.log(e);
      return res.status(500).render('error-page', { msg: 'error inesperado en servidor' });
    }
};
