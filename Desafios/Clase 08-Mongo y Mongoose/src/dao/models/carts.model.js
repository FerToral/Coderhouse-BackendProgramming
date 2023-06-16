import {Schema, model} from "mongoose";


const cartSchema = new Schema({
  products: { type: Array, required: true },
});

export const cartsModel = model("carts", cartSchema);