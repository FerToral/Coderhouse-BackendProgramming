//@ts-check

import { Router } from "express";
import { CartManager } from "../cartsManager.js";
import { productManager } from "./products.router.js";

const cartsRouter = Router();
const cartManager = new CartManager('../carritos.json')

cartsRouter.get('/', async (req,res)=>{
   
    
})

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
    res.send({status: "success" , data: `Cart added`})


  } catch(error){
    res.status(400).send({status: "error" , data: "Error creating cart" });
  }
    

});

cartsRouter.post('/:cid/products/:pid',   async (req, res) => {
  const cartId = req.params.cid;
  const prodId = req.params.pid;
  const quantity = 1;

  const productFount = await productManager.getProductById(prodId);

  if(productFount){
    try{
      await cartManager.addProductToCart(cartId, prodId);
      res.send({status: "success" , data: `${productFount.name} produt correctly added`})

    }catch(error){
      res.status(400).send({status: "error" , data: error.message });
    }
  }
  else{
    res.status(400).send({status: "error" , data: "Product Not Found" });
  }


});

cartsRouter.put('/:pid',   async (req, res) => {
   


});

cartsRouter.delete('/:pid',   async (req, res) => {

      

});





export default cartsRouter;