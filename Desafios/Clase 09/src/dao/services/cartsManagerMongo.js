//@ts-check
import { CartsModel } from "../models/carts.model.js";

export class CartManagerMongo {

    constructor(){}
   
    async getCartById(cartId){
        const search = await CartsModel.find({_id:cartId})
        return search.length != 0? search: (()=> {throw new Error('Cart not Found')});
    }
    
    async getCartByIdPopulate(cartId){
      const search = await CartsModel.findById({_id:cartId}).populate('products.product')
      console.log(search)
      return search? search: (()=> {throw new Error('Cart not Found')});
    }
    async createCart(){
        const newCart = await CartsModel.create({products: []});
        return newCart;
    }
    async addProductToCart(cid, pid) {
      try {
        const cart = await CartsModel.findOneAndUpdate(
          { _id: cid, "products.product": pid },
          { $inc: { "products.$.quantity": 1 } },
          { new: true }
        );
    
        if (!cart) {
          await CartsModel.findOneAndUpdate(
            { _id: cid },
            { $push: { products: { product: pid, quantity: 1 } } },
            { new: true }
          );
        }
      } catch (error) {
        console.error(error);
        throw new Error('Error adding product to cart');
      }
    }
    
    async deleteProductFromCart(cid,pid){
      await CartsModel.updateOne(
        { _id: cid },
        {$pull: {products: {pIp: pid}}}

      )
    }
    async updateStockProductoFromCart(cid,pid,stockUpdate){
      await CartsModel.updateOne(
        { _id: cid, "products.pId": pid},
        { $set: { "products.$.quantity": stockUpdate } }
      )
    }

    async deleteProductsFromCart(cid){
      await CartsModel.updateOne(
        { _id: cid },
        {$pull: {products: {} }}

      )
    }
      
  
}
