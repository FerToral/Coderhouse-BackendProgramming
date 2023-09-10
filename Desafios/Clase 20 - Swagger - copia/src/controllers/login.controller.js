//@ts-check
class LoginController{

    async renderLoginPage(req, res){
        try {
            req.logger.info("Render Login")
            const title = 'CityCode - Login';
            return res.render('login-form', { title });
        } catch (err) {
            res.status(501).send({ status: 'error', msg: 'Server Error', error: err });
        }
    }

    async authenticateLogin(req, res){
        if (!req.user) {
            return res.json({ error: 'invalid credentials' });
          }
        req.session.user = { 
        _id: req.user._id.toString(), 
        email: req.user.email, 
        firstName: req.user.firstName, 
        rol: req.user.rol 
        };
    
        return res.redirect('/products');
    }
    //TODO Mejorar mensajes de error
    async renderFailLoginPage(req, res){
        return res.render('error-page', {
            msg: 'Login Error'
        });
    }

    async renderGithubLoginPage(req, res){
        res.render('login-github');
    }
    //TODO Manejar devolucion de error
    async logout(req, res){
        req.session.destroy((err) => {
            if (err) {
              return res.status(500).render('error-page', { msg: 'No se pudo cerrar su session' });
            }
            return res.redirect('/login');
        });
    }

}

export const loginController = new LoginController();