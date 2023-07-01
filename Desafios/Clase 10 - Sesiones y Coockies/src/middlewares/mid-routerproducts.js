//@ts-check

import { productManagerMongo } from "../utils.js";

const paginationMiddleware = (req, res, next) => {
    let { limit, page, query, sort = '' } = req.query;
  
    const limitProd = (!limit) ? 10 : parseInt(limit);
    const pageProd = (!page) ? 1 : parseInt(page);
  
    if (isNaN(limitProd) || isNaN(pageProd)) {
      return res.status(400).json({ status: "error", data: "Limit must be a Number" });
    }

    const queryDefined = query ? ( query === 'true' || query === 'false' ? { 'status': query } : { 'category': query }) : {};
  
    req.paginationOptions = {
      limit: limitProd,
      page: pageProd,
      ...queryDefined,
      sort
    };
  
    next();
};

const validateProductMiddleware = async (req, res, next) => {
  const id = req.params.pid;

  try {
    const filteredProduct = await productManagerMongo.getProductById(id);
    
    if (!filteredProduct) {
      return res.status(404).json({ status: "error", data: "Product not found" });
    }

    req.filteredProduct = filteredProduct;
    next();
  } catch (error) {
    return res.status(500).json({ status: "error", data: error.message });
  }
};
  

  