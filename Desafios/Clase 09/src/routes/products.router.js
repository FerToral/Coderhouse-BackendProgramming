//@ts-check
import { Router } from "express";
import { ProductManager } from "../dao/services/productManager.js";
import { ProductsModel } from "../dao/models/products.model.js";


const productsRouter = Router();
export const productManager = new ProductManager('./productos.json');



productsRouter.get('/', async (req,res)=>{
    let {limit} = req.query
   
    const products = await ProductsModel.find({});
    
    limit = (!limit)? products.length : limit;

    if(isNaN(limit)){
      res.status(400).send({status: "error", data: "Limit must be a Number"})
    } else if(limit < 0 || limit > products.length){
      res.status(400).send({status: "error", data: "Limit ist not in range"})
    } else {
      const productsWithLimit = products.slice(0,limit);
      return res.status(200).json({
        status: "success", 
        msg: "List of Products",
        data: productsWithLimit });
    }
    
})

productsRouter.get('/:pid', async (req,res)=>{
    const id = parseInt(req.params.pid);

    try{
      //const filteredProduct = await productManager.getProductById(id);
      const filteredProduct = await ProductsModel.find({ "id": id })
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
        await productManager.addProduct(
          title,
          description,
          price,
          thumbnails,
          code,
          stock,
          status,
          category
        );
        await ProductsModel.create({
          title,
          description,
          price,
          thumbnails: thumbnails || [],
          code,
          stock,
          status,
          category,

        })
        res.status(201).send({ status: "success", data: newProduct})
  

      } catch (error){
        res.status(400).send({status: "error" , data: error.message });
      }
      

});

productsRouter.put('/:pid',   async (req, res) => {
      const pid = req.params.pid;
      const {campo } = req.body;

      try {
          await productManager.updateProduct(pid, campo);
          let result = await ProductsModel.updateOne({id:pid},)
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