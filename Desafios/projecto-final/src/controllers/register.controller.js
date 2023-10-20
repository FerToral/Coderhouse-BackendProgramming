
class RegisterController {
    async getRegisterForm(req, res) {
        return res.render('register-form', {});
    }

    async registerUser(req, res, next) {
        if (!req.user) {
            return res.json({ error: 'something went wrong' });
        }
        req.session.user = { 
            _id: req.user._id.toString(), 
            email: req.user.email, 
            firstName: req.user.firstName, 
            lastName: req.user.lastName, 
            rol: req.user.rol 
        };
        
        return res.redirect('/');
    }

    async failRegister(req, res) {
        return res.render('error-page', {
            msg: 'Error Register'
        });
    }
}

export const registerController = new RegisterController();
