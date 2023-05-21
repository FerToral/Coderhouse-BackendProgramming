class Carrito {
    #idIncremental = 1;
    #cartItems = [];
  
    #generateID() {
      return this.#idIncremental++;
    }
  
    get cartItems() {
      return this.#cartItems;
    }
  
    addProduct(product) {
      const newCartItem = { id: this.#generateID(), product };
      this.#cartItems.push(newCartItem);
      return newCartItem;
    }
  
    removeProductById(id) {
      const index = this.#cartItems.findIndex(item => item.id === id);
      if (index !== -1) {
        return this.#cartItems.splice(index, 1)[0];
      }
      return null;
    }
  
    getProductById(id) {
      const cartItem = this.#cartItems.find(item => item.id === id);
      return cartItem ? cartItem.product : null;
    }
  
    getAllProducts() {
      return this.#cartItems.map(item => item.product);
    }
  
    clearCart() {
      this.#cartItems = [];
    }
  }
  