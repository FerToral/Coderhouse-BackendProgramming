export default function checkLogin(req, res, next) {
	if (req.session.user) {
		return next();
	} else {
		return res.status(201).render("error-auth");
	}
}
