//@ts-check
import { Router } from "express";
import { productManagerMongo } from "../utils.js";
import {paginationMiddleware, validateProductMiddleware, validationProduct} from "../middlewares/mw-routerproducts.js"

const productsRouter = Router();

productsRouter.get('/', paginationMiddleware, async (req,res)=>{
  const { limit, page, query, sort } = req.paginationOptions;
  try{
    const products = await productManagerMongo.paginationProduct(limit, page, query, sort);

    return res.status(200).json({
      status: 'succesfull',
      msg: 'Product list',
      data: {
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.prevLink,
        nextLink: products.nextLink,
      },
    });
  }catch(error){
    return res.status(500).json({ status: 'Error', msg: 'Something went wrong', data: { error } });
  }
      
})

productsRouter.get('/:pid', async (req,res)=>{
    const id = req.params.pid;
    try{
      const filteredProduct = await productManagerMongo.getProductById(id);
      res.status(200).json({ 
        status: "success", 
        data: filteredProduct});
    }catch(error){
      res.status(404).json({
        status: "error", 
        data: error.message});
    }
 

})

productsRouter.post('/', validationProduct, async (req, res) => {

    const newProduct = req.product;
    try{
      await productManagerMongo.addProduct(newProduct)
      res.status(201).json({ status: "success", data: newProduct})

    } catch (error){
      res.status(400).json({status: "error" , data: error.message });
    }
      

});

productsRouter.put('/:pid',   async (req, res) => {
    const pid = req.params.pid;
    const {campo } = req.body;

    try {
        const updatedProduct = await productManagerMongo.updateProduct(pid,campo);
        res.status(200).json({ status: "success", msg: "Product updated", data: updatedProduct });

    } catch (error) {
        res.status(400).json({ status: "error", data: "Error updating product" });
    }
      

});

productsRouter.delete('/:pid',   async (req, res) => {
   
    const id = req.params.pid

    try {
        const deletedProduct = await productManagerMongo.deleteProduct(id)
        res.status(200).json({ status: "success", msg: "Removed Product", data: deletedProduct });

    } catch (error) {
        res.status(400).json({ status: "error", data: "Error deleting the product" });
    }
      

});

export default productsRouter;