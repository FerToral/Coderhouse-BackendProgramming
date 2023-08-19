export const validateFieldsUser = (req, res, next) => {
    const { firstName, lastName, email, password, rol } = req.body;
    if (!firstName ||!lastName ||!email || !password || !rol) {
   
        return res.status(400).json({
            status: "error",
            msg: "please complete email, username, password and rol.",
            payload: {},
        });
    }
    req.user = {
        firstName,
        lastName,
        email,
        password,
        rol
    }
  
    next();
};

