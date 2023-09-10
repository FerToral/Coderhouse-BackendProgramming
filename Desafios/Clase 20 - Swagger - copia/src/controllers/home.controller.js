//@ts-chec

class HomeController{
    async getHome(req, res){
        try {
            const title = 'CityCode®';
            const email = req.session.user?.email;
            const firstName = req.session.user?.firstName;
            const rol = req.session.user?.rol;
            
            return res.status(200).render('home', { title,email , firstName, rol });
        } catch (error) {
            req.logger.error('Server error')
            res.status(501).send({ status: 'error', msg: 'Server Error', error: error });
        }
    }
}

export const homeController = new HomeController();