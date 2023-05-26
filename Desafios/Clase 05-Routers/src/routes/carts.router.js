//@ts-check

import { Router } from "express";
import { CartManager } from "../cartsManager.js";
import { productManager } from "./products.router.js";

const cartsRouter = Router();
const cartManager = new CartManager('../carritos.json')


cartsRouter.get('/:cid', async (req,res)=>{
  const cartId = req.params.cid;
  try{
    const cartFound = await cartManager.getCartById(cartId);
    
    if(cartFound){
      res.status(201).json(cartFound.products);
    }else{
      res.status(404).send({status: "error", data: "Cart not found"});
    }
   
  } catch(error){
    res.status(400).send({status: "error" , data: "Error retrieving cart" });
  }
  

})

cartsRouter.post('/',   async (req, res) => {

  try{
    await cartManager.createCart()
    res.status(201).send({status: "success" , data: `Cart added`})


  } catch(error){
    res.status(400).send({status: "error" , data: "Error creating cart" });
  }
    

});

cartsRouter.post('/:cid/products/:pid',   async (req, res) => {
  const cartId = req.params.cid;
  const prodId = req.params.pid;

  const productFound = await productManager.getProductById(prodId);

  if(productFound){
    try{
      await cartManager.addProductToCart(cartId, prodId);
      res.status(201).send({status: "success" , data: `${productFound.name} product correctly added`})

    }catch(error){
      res.status(400).send({status: "error" , data: error.message });
    }
  }
  else{
    res.status(404).send({status: "error" , data: "Product Not Found" });
  }


});



export default cartsRouter;