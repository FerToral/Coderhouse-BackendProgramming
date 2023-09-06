//@ts-check

import { productService } from "../utils/utils.js";
import { ProductsModel } from "../dao/models/products.model.js";



export const paginationMiddlewareViews = (req, res, next) => {
    let { limit, page, query, sort = '' } = req.query;
  
    const limitProd = (!limit) ? 10 : parseInt(limit);
    const pageProd = (!page) ? 1 : parseInt(page);
  
    if (isNaN(limitProd) || isNaN(pageProd)) {
        return res.status(400).render('error-page', { msg: "Limit must be a Number" });
    }

    const queryDefined = query ? ( query === 'true' || query === 'false' ? { 'status': query } : { 'category': query }) : {};
  
    req.paginationOptions = {
      limit: limitProd,
      page: pageProd,
      query: queryDefined,
      sort
    };
  
    next();
};

export const validateProductMiddlewareViews = async (req, res, next) => {
  const id = req.params.pid;

  try {
    const filteredProduct = await productService.getProductById(id);
    
    if (!filteredProduct) {
        return res.status(400).render('error-page', { msg: "Product not found" });

    }

    req.filteredProduct = filteredProduct;
    next();
  } catch (error) {
    return res.status(500).render('error-page', { msg: "Product not found" });
  }
};
  
export const validationProductViews = async (req, res, next) => {
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
    return res.status(400).render('error-page', { msg: "Error. Repeated Product Code" });
  }
  const allValuesExist = Object.entries(newProduct).every(([key, value]) => key === 'thumbnails' || (!!value && value !== ''));

  if (!allValuesExist) {
    return res.status(400).render('error-page', { msg: "Error. Entering empty, null, or undefined fields" });
  }

  req.product = newProduct;

  next();
}

  