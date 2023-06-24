import mongoose, {Schema, model} from "mongoose";

const productsSchema = new Schema({
  pId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', require: true},
  quantity: { type: Number, required: true },
  default:[]
})


const cartSchema = new Schema({
  products: { type: [productsSchema], required: true },
});

export const CartsModel = model("carts", cartSchema);