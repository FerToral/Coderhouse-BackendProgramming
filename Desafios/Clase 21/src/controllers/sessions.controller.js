//@ts-check

import { UserDTO } from "../dtos/userDTO.js";

class SessionController{
    async getProfile(req, res){
        const user = req.session.user;
        return res.render('profile', { user: user });
    }
    async testAdmin(req, res){
        return res.send('datos super secretos clasificados sobre los nuevos ingresos a boca juniors');
    }

    async githubAuth(req, res){
        req.session.user = req.user;
        // Successful authentication, redirect home.
        res.redirect('/');
    }

    async current(req, res){
        const sesion = new UserDTO(req.session.user)
        return res.status(200).json({
            status: 'success',
            msg: 'datos de la session',
            payload: sesion,
        });
    }
    

}

export const sessionController = new SessionController();