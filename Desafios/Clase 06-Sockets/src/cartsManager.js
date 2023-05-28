//@ts-check

import * as fs from "fs";

export class CartManager {
    #carts = [];
    #idIncremental = -1;

    constructor(path){
        this.path = path;
        if (!fs.existsSync(this.path))
            fs.writeFileSync(this.path, "[]")
        const cartsString =  fs.readFileSync(this.path,'utf-8');
        this.#carts = cartsString==''?[]:JSON.parse(cartsString);
        this.calculateIdIncremental();

     
    }

    calculateIdIncremental() {
        if (this.#carts.length !== 0) {
            this.#idIncremental = this.#carts.reduce((max, cart) => (parseInt(cart.id) > max ? cart.id : max), this.#idIncremental);
        }
    }
  
    async getCartById(cartId){
        const cartsString = await fs.promises.readFile(this.path, 'utf-8');
        this.#carts = JSON.parse(cartsString);
        const search = this.#carts.find(cart => cart.id == cartId)
        return search??false;
    }
    async createCart(){

        const newCart = {
          id: ++this.#idIncremental,
          products: []

        }
        this.#carts = [...this.#carts, newCart];
        const newCartsString = JSON.stringify( this.#carts);
        await fs.promises.writeFile(this.path, newCartsString);
    }
    async addProductToCart(cid, pid){

        const cartFound = await this.getCartById(cid);

        if(cartFound){
            const productFoundInCart = cartFound.products.find(prod => prod.id == pid);
            if(productFoundInCart){
                productFoundInCart.quantity++;
            }
            else{
                const product = {
                    id: pid,
                    quantity: 1,
                }
                cartFound.products.push(product)
            }
            const cartsString = JSON.stringify(this.#carts);
            await fs.promises.writeFile(this.path, cartsString);
        }else{
            throw new Error('Cart not Found')
        }
       
    }
  
}
