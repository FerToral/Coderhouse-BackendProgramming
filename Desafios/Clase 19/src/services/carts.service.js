//@ts-check

import { cartDao } from "../dao/factory.js";
import { productService, ticketService } from "../utils/utils.js";
import { ProductDTO } from "../dtos/productDTO.js";



export class CartService{

    constructor(){}
   
    async getCartById(cartId){
        const search = await cartDao.getCartById(cartId);
        return search? search: (()=> {throw new Error('Cart not Found')});
    }
    
    async getCartByIdPopulate(cartId){
      const cartFound = await cartDao.getCartByIdPopulate(cartId);
      return cartFound;
    }
    async getPopulatedCartProducts(cId) {
      const cartFound = await this.getCartByIdPopulate(cId);
      const cartProducts = cartFound.products.map(prod => ({
        ...new ProductDTO(prod),
        quantity: prod.quantity
    }));
      return cartProducts;
  }
    async createCart(){
        const newCart = await cartDao.createCart();
        return newCart;
    }
    async addProductToCart(cartId, productId) {
      try {
        const cart = await cartDao.findAndIncreaseStock(cartId, productId);
    
        if (!cart) {
          await cartDao.findAndAddProduct(cartId, productId);
        }
      } catch (error) {
        throw new Error('Error adding product to cart');
      }
    }
    
    async deleteProductFromCart(cartId,productId){
      const result = await cartDao.deleteProduct(cartId, productId)
      return result;
    }
    async updateStockProductoFromCart(cartId,productId,stockUpdate){
      await cartDao.updateStock(cartId, productId, stockUpdate)
    }
    async emptyCart(cartId) {
      try{
        const cart = await cartDao.getCartById(cartId)
        if (!cart) {
          throw new Error("Carrito no encontrado");
        }

      cart.products = []; // Elimina todos los productos del carrito
      await cartDao.saveCart(); // Guarda los cambios en la base de datos
      }catch(error){
        throw new Error(error)
      }
    }

    async updateProductsFromCart(cartId, productsUpdate) {
      const result = await cartDao.updateCart(cartId, productsUpdate)
      return result;
    }

    async purchase(cartId){
      try {
        const cart = await this.getCartByIdPopulate(cartId)
        const productsWithInsufficientStock = []
        const productsToPurchase = [];
        let totalAmount = 0;
  
        for(const cartItem of cart.products){
  
          if( cartItem.product.stock < cartItem.quantity )
            productsWithInsufficientStock.push(cartItem.product._id);
          
          productsToPurchase.push(cartItem);
          const update = {
            stock: cartItem.product.stock - cartItem.quantity
          }
          totalAmount+= cartItem.product.price * cartItem.quantity;
          await productService.updateProduct(cartItem.product._id, update);
          await this.deleteProductFromCart(cartId, cartItem.product._id);

        }

        const email = req.session.user.email; // O cualquier forma de obtener el comprador
        const createdTicket = await ticketService.createTicket(totalAmount, email);
  
        if(productsWithInsufficientStock.length > 0){
            return productsWithInsufficientStock;
  
        }
      } catch (error) {
            throw new Error(error);
      }
    }
    
}
