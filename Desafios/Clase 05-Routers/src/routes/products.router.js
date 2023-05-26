//@ts-check
import { Router } from "express";
import { ProductManager } from "../productManager.js";


const productsRouter = Router();
export const productManager = new ProductManager('../products.json');



productsRouter.get('/', async (req,res)=>{
    let limit = req.query.limit;
    const products = await productManager.getProducts();
    
    limit = (!limit)? products.length : limit;

    if(isNaN(limit)){
      res.status(400).send({status: "error", data: "Limit must be a Number"})
    } else if(limit < 0 || limit > products.length){
      res.status(400).send({status: "error", data: "Limit ist not in range"})
    } else {
      const productsWithLimit = products.slice(0,limit);
      res.status(200).send({ status: "success", data: productsWithLimit });
    }
    
})

productsRouter.get('/:pid', async (req,res)=>{
    const id = parseInt(req.params.pid);
    const filteredProduct = await productManager.getProductById(id);
    if(filteredProduct == 'Not Found'){
      res.status(404).send({status: "error", data: "Product Not Found"})
    }
    else{
      res.status(200).send({ status: "success", data: filteredProduct})
    }
 

})

productsRouter.post('/',  async (req, res) => {

      const { title, description, code, price, stock, category, thumbnails } = req.body;

      const newProduct = {
        title,
        description,
        code,
        price, 
        status: true, // Status es true por defecto
        stock,
        category,
        thumbnails: thumbnails || [], 
      };
      try{
        await productManager.addProduct(newProduct);
        res.status(201).json(newProduct);

      } catch (error){
        res.status(400).send({status: "error" , data: error.message });
      }
      

});

productsRouter.put('/:pid',   async (req, res) => {
   
    const { id, campo } = req.body;

    try {
        await productManager.updateProduct(id, campo);
        res.status(200).send({ status: "success", data: "Product updated" });

    } catch (error) {
        res.status(400).send({ status: "error", data: "Error updating product" });
    }
      

});

productsRouter.delete('/:pid',   async (req, res) => {
   
    const id = req.params.pid

    try {
        await productManager.deleteProduct(id);
        res.status(200).send({ status: "success", data: "Removed Product" });

    } catch (error) {
        res.status(400).send({ status: "error", data: "Error deleting the product" });
    }
      

});





export default productsRouter;