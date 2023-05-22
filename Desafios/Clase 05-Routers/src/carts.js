//@ts-check
export class Cart {
    static #idIncremental = 1;
    #products;
    #id;

    constructor(){
      this.#id = Cart.#idIncremental++;
      this.#products = [];
    }
  
    #generateID() {
      return this.#idIncremental++;
    }
  
    get products() {
      return this.#products;
    }
  
    addProduct(product) {
      const newProduct = { id: this.#generateID(), product };
      this.#products.push(newProduct);
      return newProduct;
    }
  
    deleteProductById(id) {
      const index = this.#products.findIndex(item => item.id === id);
      if (index !== -1) {
        return this.#products.splice(index, 1)[0];
      }
      return null;
    }
  
    getProductById(id) {
      const cartItem = this.#products.find(item => item.id === id);
      return cartItem ? cartItem.product : null;
    }
  
    getAllProducts() {
      return this.#products.map(item => item.product);
    }
  
    
  }
  