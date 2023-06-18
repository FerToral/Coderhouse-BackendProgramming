//@ts-check

import * as fs from "fs";

export class CartManager {
    #carts=[];
    #idIncremental = -1;

    constructor(path){
        this.path = path;
        this.#ensureFileExist();
        this.#loadCartsFromFile();
        this.#loadCartsFromFile().then(()=>this.#calculateIdIncremental());
     
    }
    #ensureFileExist(){
        if (!fs.existsSync(this.path))
            fs.writeFileSync(this.path, "[]");
    }
    async #loadCartsFromFile(){
        const cartsString =  await fs.promises.readFile(this.path,'utf-8');
        this.#carts = JSON.parse(cartsString);
    }
    async #writeCartsToFile(){
        const cartsString = JSON.stringify(this.#carts);
        await fs.promises.writeFile(this.path, cartsString);
    }
    #calculateIdIncremental() {
        this.#idIncremental = this.#carts.reduce((max, cart) => (parseInt(cart.id) > max ? cart.id : max), this.#idIncremental);
        
    }
  
    async getCartById(cartId){
        this.#loadCartsFromFile();
        const search = this.#carts.find(cart => cart.id == cartId)
        return search !== 'undefine'? search: (()=> {throw new Error('Cart not Found')});
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
