import CustomError from "../services/erros/CustomError.js";
import { generateStockErrorInfo } from "../services/erros/info.js";


export function stockValidation(req, res, next) {

    const {stock} = req.body;

    if (!isNaN(stock) && parseInt(stock) >= 0) {
      return next();
    }

    CustomError.createError({
        name: "StockInvalidError",
        cause: generateStockErrorInfo({stock}),
        message: "Error Trying to update stock",
        code: EErrors.INVALID_TYPES_ERROR

    })

}
  
