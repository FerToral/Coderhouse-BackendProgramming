//@ts-check
class Cart{
    static id = 1;
 
    constructor(){
        this.id = Cart.id++;
        this.products = []
    }
}

const cart = new Cart();

console.log(cart)