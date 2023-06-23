import {Schema, model} from "mongoose";

const productsSchema = new Schema({
  pId: { type: String, ref: 'ProductsModel', require: true},
  quantity: { type: Number, required: true },
})


const cartSchema = new Schema({
  products: { type: Array, required: true },
});

export const CartsModel = model("carts", cartSchema);