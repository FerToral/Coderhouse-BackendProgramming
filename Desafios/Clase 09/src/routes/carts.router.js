//@ts-check

import { Router } from "express";
import { CartManager } from "../dao/services/cartsManager.js";
import { productManager } from "./products.router.js";
import { cartManagerMongo, productManagerMongo } from "../utils.js";

 
const cartsRouter = Router();
const cartManager = new CartManager('./carritos.json')



cartsRouter.get('/:cid', async (req,res)=>{
  const cartId = parseInt(req.params.cid);
  try{
    //const cartFound = await cartManager.getCartById(cartId);
    const cartFound = await cartManagerMongo.getCartById(cartId);
    res.status(201).json({status: "success", data: cartFound});
      
  } catch(error){
    res.status(404).json({status: "error", data: "Cart not found"});
  }
  

})

cartsRouter.post('/',   async (req, res) => {

  try{
    const newCart = await cartManager.createCart();
    const newCartMongo = await cartManagerMongo.createCart()
    res.status(201).json({status: "success" , data: `Cart added: ${newCartMongo}`})


  } catch(error){
    res.status(400).json({status: "error" , data: "Error creating cart" });
  }
    

});

cartsRouter.post('/:cid/products/:pid',   async (req, res) => {
  const cartId = req.params.cid;
  const prodId = req.params.pid;

  try{
    // const productFound = await productManager.getProductById(prodId);
    // await cartManager.addProductToCart(cartId, productFound);
    const productFound = await productManagerMongo.getProductById(prodId); 
    await cartManagerMongo.addProductToCart(cartId,prodId);
    res.status(201).json({status: "success" , data: `${productFound} product correctly added`})
  }catch(error){
    res.status(404).json({status: "error" , data: error.message });
  }



});

cartsRouter.delete('api/carts/:cid/products/:pid', async (req, res) => {
  
  const {cid,pid} = req.params;

  try{
    const result = cartManagerMongo.deleteProductFromCart(cid,pid)
    res.status(200).json({status: "error" , data: result })
  }catch(error){
    res.status(404).json({status: "error" , data: error.message });
  }
  

})

cartsRouter.delete('api/carts/:cid', async (req, res) => {
  
  const cid = req.params;

  try{
    const result = cartManagerMongo.deleteProductsFromCart(cid);
    res.status(200).json({status: "error" , data: result })
  }catch(error){
    res.status(404).json({status: "error" , data: error.message });
  }
  

})

cartsRouter.put('api/carts/:cid', async (req,res) => {

  const cid = req.params;

})

cartsRouter.put('api/carts/:cid/products/:pid', async (req,res) => {

  const {cid,pid} = req.params;
  const {stock} = req.body;

  const stockUpdate = parseInt(stock);

  try{
    const result = cartManagerMongo.updateStockProductoFromCart(cid,pid,stockUpdate);
    res.status(200).json({status: "error" , data: result })
  }catch(error){
    res.status(404).json({status: "error" , data: error.message });
  }

  
  
})
export default cartsRouter;

function deleteProductToCart(cid, pid) {
  throw new Error("Function not implemented.");
}
