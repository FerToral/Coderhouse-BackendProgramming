//@ts-check
import { Router } from "express";
import { ProductManager } from "../controllers/productManager.js";
import { productManagerMongo } from "../utils.js";


const productsRouter = Router();
export const productManager = new ProductManager('./productos.json');



productsRouter.get('/', async (req,res)=>{
    let {limit, page, query, sort=''} = req.query

    const limitProd = (!limit)? 10 : parseInt(limit);
    const pageProd = (!page)? 1: parseInt(page);


    if(isNaN(limitProd) || isNaN(pageProd)){
      res.status(400).send({status: "error", data: "Limit must be a Number"})
    } else {

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
      
}})

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

productsRouter.post('/',  async (req, res) => {

    const { title, description, code, price, stock, category, thumbnails, status } = req.body;

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