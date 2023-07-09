export function checkUser(req, res, next) {
  if (req.session.email) {
    return next();
  }
  // return res.status(401).render('error-page', { msg: 'please log in' });
  return res.redirect('/login');
}

export function checkAdmin(req, res, next) {
  if (req.session.email && req.session.admin == true) {
    return next();
  }
  return res.status(401).render('error-page', { msg: 'please log in AS ADMIN!' });
}


export function getSession(req, res, next){
  const firstName = req.session.firstName;
  const email = req.session.email;
  const admin = req.session.admin;
  req.sessionData = {
    firstName,
    email,
    admin
  }
  return next();
}