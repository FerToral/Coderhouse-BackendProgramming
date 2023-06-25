//@ts-check

import { Router } from "express";
import { CartManager } from "../controllers/cartsManager.js";
import { productManager } from "./products.router.js";
import { cartManagerMongo, productManagerMongo } from "../utils.js";

 
const cartsRouter = Router();
const cartManager = new CartManager('./carritos.json')



cartsRouter.get('/:cid', async (req,res)=>{
  const cartId = req.params.cid;
  try{
    const cartFound = await cartManagerMongo.getCartByIdPopulate(cartId);
    res.status(201).json({status: "success", data: cartFound});
      
  } catch(error){
    res.status(404).json({status: "error", data: "Cart not found"});
  }
  

})

cartsRouter.post('/',   async (req, res) => {

  try{
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
    const productFound = await productManagerMongo.getProductById(prodId); 
    await cartManagerMongo.addProductToCart(cartId,prodId);
    res.status(201).json({status: "success" , data: `${productFound} product correctly added`})

  }catch(error){
    res.status(404).json({status: "error" , data: error.message });
  }



});

cartsRouter.delete('/:cid/products/:pid', async (req, res) => {
  
  const {cid,pid} = req.params;

  try{
    const result = cartManagerMongo.deleteProductFromCart(cid,pid)
    res.status(200).json({status: "error" , data: result })
  }catch(error){
    res.status(404).json({status: "error" , data: error.message });
  }
  

})

cartsRouter.delete('/:cid', async (req, res) => {

  const cid = req.params;

  try{
    const result = cartManagerMongo.emptyCart(cid);
    res.status(200).json({status: "error" , data: result })
  }catch(error){
    res.status(404).json({status: "error" , data: error.message });
  }
  

})

cartsRouter.put('/:cid', async (req,res) => {

  const cid = req.params;
  const productUpdate = req.body;

  await cartManagerMongo.updateProductsFromCart(cid, productUpdate);
  //TODO
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
