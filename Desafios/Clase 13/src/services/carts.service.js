//@ts-check

import { cartDao } from "../dao/mongo/carts.mongo.js";
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
    
      
}
