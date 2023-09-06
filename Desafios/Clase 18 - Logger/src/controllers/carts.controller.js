//@ts-check
import { cartService, productService } from "../utils/utils.js";

class CartController{
  constructor(){}
    async renderCart(req, res) {
      const cartId = req.params.cid;
      try {
          const cartProducts = await cartService.getPopulatedCartProducts(cartId);
          return res.render('cart', { cartProducts });
      } catch (error) {
          return res.render('error', { error: error.message });
      }
    }
    async getCart(req, res){
        const cartId = req.params.cid;
        try{
          const cartFound = await cartService.getCartByIdPopulate(cartId);
          return res.status(201).json({status: "success", data: cartFound});
            
        } catch(error){
          res.status(404).json({status: "error", data: `Cart not found. ${error.message}`});
        }
    }
    async postCart(req, res){
        try{
            const newCartMongo = await cartService.createCart()
            res.status(201).json({status: "success" , data: `Cart created: ${newCartMongo}`})
        
        } catch(error){
            res.status(400).json({status: "error" , data: "Error creating cart" });
        }
    }

    async postProductToCart(req, res){
        const cartId = req.params.cid;
        const prodId = req.params.pid;
      
        try{
          const productFound = await productService.getProductById(prodId);
          await cartService.addProductToCart(cartId,prodId);
          return res.status(201).json({status: "success" , data: `${productFound} product correctly added`})
      
        }catch(error){
          res.status(404).json({status: "error" , data: error.message });
        }
    }
    
    async deleteProduct(req, res){
        const {cid,pid} = req.params;
      
        try{
          const result = await cartService.deleteProductFromCart(cid,pid)
          if(!result)
            return res.status(200).json({status: "success" , data: `Product is no longer in the cart.` })
          res.status(200).json({status: "success" , data: `Product removed from cart. ${result}` })
        }catch(error){
          res.status(404).json({status: "error" , data: error.message });
        }
    }

    async deleteCart(req, res){
        const cId = req.params.cid;

        try{
            await cartService.emptyCart(cId);
            res.status(200).json({status: "success" , data: `Cart emptied` })
        }catch(error){
            res.status(404).json({status: "error" , data: error.message });
        }
    }
    
    async putCart(req, res){
        const cId = req.params.cid;
        const pUpdate = req.body;
        
        try{
            const result = await cartService.updateProductsFromCart(cId, pUpdate);
            res.status(200).json({status: "success" , data: result })
        }catch(error){
            res.status(404).json({status: "error" , data: error.message });
        }
    }

    async putStock(req, res){

        const {cid,pid} = req.params;
        const {stock} = req.body;
        const stockUpdate = parseInt(stock);
      
        try{
          const result = cartService.updateStockProductoFromCart(cid,pid,stockUpdate);
          res.status(200).json({status: "success" , data: result })
        }catch(error){
          res.status(404).json({status: "error" , data: error.message });
        }
      
    }

    async purchase(req, res){
      const  cartId = req.params.cid;
      try {
        const productsWithInsufficientStock = await cartService.purchase(cartId);

        return res.status(201).json({
          status: 'success',
          msg: 'Purchase completed',
          productsNotPurchased: productsWithInsufficientStock,
        });

      } catch (error) {
        return res.status(500).json({
            status: 'error',
            msg: `An error occurred during the purchase process. ${error}`,
        });
      }
      

    }
}

export const cartController = new CartController();