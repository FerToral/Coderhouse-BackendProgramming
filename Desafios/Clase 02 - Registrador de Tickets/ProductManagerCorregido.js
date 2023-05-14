//@ts-check

class ProductManager {
    #products = []
    constructor(){
      
    }
    getProducts(){
        return this.#products;
    }
    getProductById(id){
        const search = this.#products.find(product => product.id == id)
        return search??console.log('Not Found');
    }
    #validationProduct(newProduct){

        const codeRepeate = this.#products.find(prod => prod.code == newProduct.code)?true:false;
        const allValuesExist = Object.values(newProduct).every(value => !!value && value != '' );
       
     
        if(codeRepeate){
            console.log('Error. Repeated Product Code')
        }
        if(!allValuesExist){
            console.log('Error. Entering empty, null or undefined fields')
        }

        return (!codeRepeate && allValuesExist );
    }
    #generateID(){

        return this.#products.length;  
    }
    addProduct(
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    ){
        const newProduct = {title, description, price, thumbnail, code, stock}
        if(this.#validationProduct(newProduct)){
            this.#products = [...this.#products, {...newProduct, id: this.#generateID()}]
        }
    
    }
}

// const productManager = new ProductManager;

// console.log(productManager.getProducts())

// productManager.addProduct(

//     'producto prueba',
//     'asdas',
//     200,
//     'Sin imagen',
//     'abc123',
//     25

// )

// console.log(productManager.getProducts())

// productManager.addProduct(

//     'producto prueba 2',
//     'asdsa',
//     200,
//     'Sin imagen',
//     'abdc123',
//     25

// )
// console.log(productManager.getProducts())

// console.log(productManager.getProductById(1))


// productManager.getProductById(2)

