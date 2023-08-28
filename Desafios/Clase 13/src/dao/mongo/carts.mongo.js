import { CartsModel } from "../models/carts.model.js";

class CartDAO {

    async getCartById(cartId) {
        return await CartsModel.findOne({ _id: cartId });
       
    }

    async getCartByIdPopulate(cartId) {
        const cartFound = await CartsModel.findById({ _id: cartId}).populate('products.product');
        return cartFound;
    }

    async createCart() {
        const newCart = await CartsModel.create({ products: [] });
        return newCart;
    }
    
    async findAndIncreaseStock(cartId,productId){
        return await CartsModel.findOneAndUpdate(
            { _id: cartId, "products.product": productId },
            { $inc: { "products.$.quantity": 1 } },
            { new: true }
        );
    }

    async findAndAddProduct(cId, pId) {
        await CartsModel.findOneAndUpdate(
            { _id: cId },
            { $push: { products: { product: pId, quantity: 1 } } },
            { new: true }
        )
       
    }

    async deleteProduct(cId, pId) {
        return await CartsModel.findOneAndUpdate(
            { _id: cId, "products.product": pId },
            { $pull: { products: { product: pId } } },
        );
    }

    async updateStock(cId, pId, stockUpdate) {
        await CartsModel.updateOne(
            { _id: cId, "products.product": pId },
            { $set: { "products.$.quantity": stockUpdate } }

        );
    }

    async saveCart() {
       await cart.save(); // Guarda los cambios en la base de dtos
    }

    async updateCart(cartId, productsUpdate) {
        return await CartsModel.updateOne(
            { _id: cartId },
            { $set: { products: productsUpdate } }
        );
    }

}

const cartDao = new CartDAO();

export default cartDao;