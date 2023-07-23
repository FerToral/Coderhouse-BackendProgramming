export function isUser(req, res, next) {
  if (req.session?.user?.email) {
    return next();
  }
  return res.status(401).render('error', { error: 'error de autenticacion!' });
}

export function isAdmin(req, res, next) {
  if (req.session?.user?.isAdmin) {
    return next();
  }
  return res.status(403).render('error', { error: 'error de autorización!' });
}

export function checkUser(req, res, next) {
  if (req.session?.user?.email) {
    return next();
  }
  // return res.status(401).render('error-page', { msg: 'please log in' });
  return res.redirect('/login');
}

export function checkAdmin(req, res, next) {
  if (req.session?.user?.email && req.session.user.isAdmin == true) {
    return next();
  }
  return res.status(401).render('error-page', { msg: 'please log in AS ADMIN!' });
}


export function getSession(req, res, next){

  const firstName = req.session.user.firstName;
  const email = req.session.user.email;
  const admin = req.session.user.isAdmin;
  req.sessionData = {
    firstName,
    email,
    admin
  }
  return next();
}