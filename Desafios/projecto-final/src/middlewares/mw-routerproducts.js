//@ts-check


import { ProductsModel } from "../dao/models/products.model.js";
import CustomError from "../services/erros/CustomError.js";
import EErrors from "../services/erros/enum.js";
import { generatePaginationErrorInfo, generateProductCodeErrorInfo, generateProductValuesErrorInfo } from "../services/erros/info.js";



export const paginationMiddleware = (req, res, next) => {
    let { limit, page, query, sort = '' } = req.query;
  
    const limitProd = (!limit) ? 10 : parseInt(limit);
    const pageProd = (!page) ? 1 : parseInt(page);

    if (!limit || !page) {
      req.logger.warning('Se utilizó un valor predeterminado porque limit o page no se especificaron.');
    }
  
    if (isNaN(limitProd) || isNaN(pageProd)) {
      CustomError.createError({
        name: "InvalidPagingValue",
        cause: generatePaginationErrorInfo(limit, pageProd),
        message: "Error with received paging values",
        code: EErrors.INVALID_TYPES_ERROR

      })
      return res.status(400).json({ status: "error", data: "Limit must be a Number" });
    }

    const queryDefined = query ? ( query === 'true' || query === 'false' ? { 'status': query } : { 'category': query }) : {};
    
    if(Object.keys(queryDefined).length == 0)
      req.logger.warning('No criteria submitted or valid for pagination');
  
    req.paginationOptions = {
      limit: limitProd,
      page: pageProd,
      query: queryDefined,
      sort
    };
  
    next();
};

// export const validateProductMiddleware = async (req, res, next) => {
//   const id = req.params.pid;

//   try {
//     const filteredProduct = await productService.getProductById(id);
    
//     if (!filteredProduct) {
//       return res.status(404).json({ status: "error", data: "Product not found" });
//     }

//     req.filteredProduct = filteredProduct;
//     next();
//   } catch (error) {
//     return res.status(500).json({ status: "error", data: error.message });
//   }
// };
  
export const validationProduct = async (req, res, next) => {
  const { title, description, code, price, stock, category, thumbnails } = req.body;

  const newProduct = {
    title,
    description,
    price,
    thumbnails: thumbnails || [],
    code,
    stock,
    status: true, // Status es true por defecto
    category,
  };
  
  const search = await ProductsModel.find({"code": newProduct.code});
  if (search.length > 0) {
    req.logger.error('Repeated Product Code');

    CustomError.createError({
      name: "RepeatedProductCode",
      cause: generateProductCodeErrorInfo(newProduct),
      message: "Error with received paging values",
      code: EErrors.DUPLICATE_PRODUCT_CODE_ERROR

  })

  }
  const allValuesExist = Object.entries(newProduct).every(([key, value]) => key === 'thumbnails' || (!!value && value !== ''));

  if (!allValuesExist) {
    CustomError.createError({
      name: "InvalidProductValues",
      cause: generateProductValuesErrorInfo(newProduct),
      message: "Entering empty, null, or undefined fields",
      code: EErrors.INVALID_TYPES_ERROR

    })
    req.logger.error('Entering empty, null, or undefined fields');
    return res.status(400).json({ status: "error", data: "Error. Entering empty, null, or undefined fields" });
  }

  req.product = newProduct;

  next();
}

  