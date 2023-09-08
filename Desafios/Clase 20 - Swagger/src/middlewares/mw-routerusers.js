import CustomError from "../services/erros/CustomError.js";
import EErrors from "../services/erros/enum.js";
import { generateUserErrorInfo } from "../services/erros/info.js";

export const validateFieldsUser = (req, res, next) => {
    const { firstName, lastName, email, password, rol, age } = req.body;
    if (!firstName ||!lastName ||!email || !password || !rol) {

        CustomError.createError({
            name: "User creation error",
            cause: generateUserErrorInfo({firstName, lastName, email, rol}),
            message: "Error Trying to create User",
            code: EErrors.INVALID_TYPES_ERROR

        })
   
    }
    req.user = {
        firstName,
        lastName,
        email,
        password,
        rol,
        age
    }
  
    next();
};

