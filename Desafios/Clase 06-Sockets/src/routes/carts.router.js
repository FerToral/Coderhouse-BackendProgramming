//@ts-check

import { Router } from "express";
import { CartManager } from "../cartsManager.js";
import { productManager } from "./products.router.js";
 
const cartsRouter = Router();
const cartManager = new CartManager('./carritos.json')


cartsRouter.get('/:cid', async (req,res)=>{
  const cartId = parseInt(req.params.cid);
  try{
    const cartFound = await cartManager.getCartById(cartId);
    res.status(201).json({status: "success", data: cartFound.products});
      
  } catch(error){
    res.status(404).json({status: "error", data: "Cart not found"});
  }
  

})

cartsRouter.post('/',   async (req, res) => {

  try{
    const newCart = await cartManager.createCart()
    res.status(201).json({status: "success" , data: `Cart added: ${newCart}`})


  } catch(error){
    res.status(400).json({status: "error" , data: "Error creating cart" });
  }
    

});

cartsRouter.post('/:cid/products/:pid',   async (req, res) => {
  const cartId = req.params.cid;
  const prodId = req.params.pid;

  try{
    const productFound = await productManager.getProductById(prodId);
    await cartManager.addProductToCart(cartId, productFound);
    res.status(201).json({status: "success" , data: `${productFound.title} product correctly added`})
  }catch(error){
    res.status(404).json({status: "error" , data: error.message });
  }



});



export default cartsRouter;