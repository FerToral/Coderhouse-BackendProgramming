//@ts-check
import { CartsModel } from "../dao/models/carts.model.js";

export class CartService{

    constructor(){}
   
    async getCartById(cId){
        const search = await CartsModel.findOne({_id:cId})
        return search? search: (()=> {throw new Error('Cart not Found')});
    }
    
    async getCartByIdPopulate(cId){
      const cartFound = await CartsModel.findById({_id:cId}).populate('products.product');
      return cartFound;
    }
    async getPopulatedCartProducts(cId) {
      const cartFound = await this.getCartByIdPopulate(cId);
      const cartProducts = cartFound.products.map(prod => ({
        ...prod.product.toObject(),
        quantity: prod.quantity
    }));
      return cartProducts;
  }
    async createCart(){
        const newCart = await CartsModel.create({products: []});
        return newCart;
    }
    async addProductToCart(cId, pId) {
      try {
        const cart = await CartsModel.findOneAndUpdate(
          { _id: cId, "products.product": pId },
          { $inc: { "products.$.quantity": 1 } },
          { new: true }
        );
    
        if (!cart) {
          await CartsModel.findOneAndUpdate(
            { _id: cId },
            { $push: { products: { product: pId, quantity: 1 } } },
            { new: true }
          );
        }
      } catch (error) {
        throw new Error('Error adding product to cart');
      }
    }
    
    async deleteProductFromCart(cId,pId){
      const result = await CartsModel.findOneAndUpdate(
        { _id: cId, "products.product": pId },
        {$pull: {products: { product: pId}}},
      )
      return result;
    }
    async updateStockProductoFromCart(cId,pId,stockUpdate){
      await CartsModel.updateOne(
        { _id: cId, "products.product": pId},
        { $set: { "products.$.quantity": stockUpdate } }
        
      )
    }
    async emptyCart(cId) {
      try{
        const cart = await CartsModel.findById(cId);
        if (!cart) {
          throw new Error("Carrito no encontrado");
        }

      cart.products = []; // Elimina todos los productos del carrito
      await cart.save(); // Guarda los cambios en la base de datos
      }catch(error){
        throw new Error(error)
      }
    }

    
    async updateProductsFromCart(cId, pUpdate) {
      const result = await CartsModel.updateOne(
        { _id: cId },
        { $set: { products: pUpdate } }
      );
      return result;
    }
    
      
  
}
