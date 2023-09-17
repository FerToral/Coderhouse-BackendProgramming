

class ProfileController{

    getProfile(req, res){
        const { firstName, email, rol} = req.sessionData;
        res.render('profile', {
            firstName,
            email,
            rol
        });
    }
    

}

export const profileController = new ProfileController();