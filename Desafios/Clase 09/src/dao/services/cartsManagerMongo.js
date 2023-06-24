//@ts-check
import { CartsModel } from "../models/carts.model.js";

export class CartManagerMongo {

    constructor(){}
   
    async getCartById(cartId){
        const search = await CartsModel.find({_id:cartId})
        return search.length != 0? search: (()=> {throw new Error('Cart not Found')});
    }
    
    async getCartByIdPopulate(cartId){
      const search = await CartsModel.find({_id:cartId}).populate('products.product')
      return search.length != 0? search: (()=> {throw new Error('Cart not Found')});
    }
    async createCart(){
        const newCart = await CartsModel.create({products: []});
        return newCart;
    }
    async addProductToCart(cid, pid) {
        try {
          const cartFound = await CartsModel.findById(cid);
          if (cartFound) {
            const productFoundInCart = cartFound.products.find(prod => prod.pId == pid)?true:false;
            const idcart = cartFound._id;
            console.log(cartFound._id)
            if (idcart) {
               await CartsModel.updateOne(
                    { _id: cid, "products.pId": pid },
                    { $inc: { "products.$.quantity": 1 } }
               )
            } else {
                await CartsModel.updateOne(
                    { _id: cid},
                    { $push: { products: { pId: pid, quantity: 1 } }  }
                )
            }
          } else {
            throw new Error('Cart not Found');
          }
        } catch (error) {
          throw error;
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
