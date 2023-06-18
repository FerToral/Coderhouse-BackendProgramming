//@ts-check
import { CartsModel } from "../models/carts.model";

export class CartManager {
    #carts=[];

    constructor(){}
   
    async getCartById(cartId){
        const search = await CartsModel.find({_id:cartId})
        return search.length != 0? search: (()=> {throw new Error('Cart not Found')});
    }
    async createCart(){

        const newCart = {
          id: ++this.#idIncremental,
          products: []

        }
        this.#carts = [...this.#carts, newCart];
        this.#writeCartsToFile();
        return newCart;
    }
    async addProductToCart(cid, productFound){

        try{
            const cartFound = await this.getCartById(cid);
            const productFoundInCart = cartFound.products.find(prod => prod.id == productFound.id);
            if(productFoundInCart){
                productFoundInCart.quantity++;
            }
            else{
                const product = {
                    id: productFound.id,
                    quantity: 1,
                }
                cartFound.products.push(product)
            }
            this.#writeCartsToFile();
        }catch(error){
            throw error;
        }
        
       
    }
  
}
