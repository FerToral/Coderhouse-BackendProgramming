//@ts-check
import CustomError from "../services/erros/CustomError";
import { generateSessionErrorInfo, generateAdminErrorInfo } from "../services/erros/info";
import EErrors from "../services/erros/enum";

export function isUser(req, res, next) {
  if (req.session?.user?.email) {
    return next();
  }
  CustomError.createError({
    name: "Session not started",
    cause: generateSessionErrorInfo(req.session.user.email),
    message: "Error Trying to access resources, you are not authorized",
    code: EErrors.NOT_ACCESS_AUTORIZATION

  })

}

export function isAdmin(req, res, next) {
  if (req.session?.user?.rol == "admin") {
    return next();
  }
  CustomError.createError({
    name: "Access Forbiden",
    cause: generateAdminErrorInfo(req.session.user.rol),
    message: "Error Trying to access resources, you do not have sufficient permissions to access them",
    code: EErrors.NOT_ACCESS_AUTORIZATION

  })
}

export function checkUser(req, res, next) {
  if (req.session?.user?.email) {
    return next();
  }
  // return res.status(401).render('error-page', { msg: 'please log in' });
  return res.redirect('/login');
}

export function checkAdmin(req, res, next) {
  if (req.session?.user?.email && req.session.user.rol == 'admin') {
    return next();
  }
  return res.status(401).render('error-page', { msg: 'please log in AS ADMIN!' });
}


export function getSession(req, res, next){

  const firstName = req.session.user.firstName;
  const email = req.session.user.email;
  const rol = req.session.user.rol;
  req.sessionData = {
    firstName,
    email,
    rol
  }
  return next();
}