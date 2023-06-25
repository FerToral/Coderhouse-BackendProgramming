//@ts-check

import { Router } from "express";
import { cartManagerMongo, productManagerMongo } from "../utils.js";

 
const cartsRouter = Router();

cartsRouter.get('/:cid', async (req,res)=>{
  const cartId = req.params.cid;
  try{
    const cartFound = await cartManagerMongo.getCartByIdPopulate(cartId);
    return res.status(201).json({status: "success", data: cartFound});
      
  } catch(error){
    res.status(404).json({status: "error", data: `Cart not found. ${error.message}`});
  }
  

})

cartsRouter.post('/',   async (req, res) => {

  try{
    const newCartMongo = await cartManagerMongo.createCart()
    res.status(201).json({status: "success" , data: `Cart created: ${newCartMongo}`})

  } catch(error){
    res.status(400).json({status: "error" , data: "Error creating cart" });
  }
    

});

cartsRouter.post('/:cid/products/:pid',   async (req, res) => {
  const cartId = req.params.cid;
  const prodId = req.params.pid;

  try{
    const productFound = await productManagerMongo.getProductById(prodId);
    await cartManagerMongo.addProductToCart(cartId,prodId);
    return res.status(201).json({status: "success" , data: `${productFound} product correctly added`})

  }catch(error){
    res.status(404).json({status: "error" , data: error.message });
  }
});

cartsRouter.delete('/:cid/products/:pid', async (req, res) => {
  const {cid,pid} = req.params;

  try{
    const result = await cartManagerMongo.deleteProductFromCart(cid,pid)
    if(!result)
      return res.status(200).json({status: "success" , data: `Product is no longer in the cart.` })
    res.status(200).json({status: "success" , data: `Product removed from cart. ${result}` })
  }catch(error){
    res.status(404).json({status: "error" , data: error.message });
  }
})

cartsRouter.delete('/:cid', async (req, res) => {
  const cId = req.params.cid;

  try{
    await cartManagerMongo.emptyCart(cId);
    res.status(200).json({status: "success" , data: `Cart emptied` })
  }catch(error){
    res.status(404).json({status: "error" , data: error.message });
  }
  

})

cartsRouter.put('/:cid', async (req,res) => {

  const cId = req.params.cid;
  const productUpdate = req.body;
  
  try{
    const result = await cartManagerMongo.updateProductsFromCart(cId, productUpdate);
    res.status(200).json({status: "success" , data: result })
  }catch(error){
    res.status(404).json({status: "error" , data: error.message });
  }

})

cartsRouter.put('/:cid/products/:pid', async (req,res) => {

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
