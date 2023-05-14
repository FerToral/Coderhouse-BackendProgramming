// //@ts-check

// class ProductManager {
//     #products = []
//     constructor(){
      
//     }
//     getProducts(){
//         return this.#products;
//     }
//     getProductById(id){
//         const search = this.#products.find(product => product.id == id)
//         return search??console.log('Not Found');
//     }
//     #validationProduct(newProduct){

//         const codeRepeate = this.#products.find(prod => prod.code == newProduct.code)??false;
//         const allValuesExist = Object.values(newProduct).every(value => value ?? false);
       
//         console.log(codeRepeate)
//         console.log(allValuesExist)

//         return ( !codeRepeate && allValuesExist);
//     }
//     #generateID(){

//         let idMax = this.#products.reduce((max, product) => {
//             return product.id > max ? product.id : max;
//           }, 0);

//         return ++idMax;  
//     }
//     addProduct(
//         title,
//         description,
//         price,
//         thumbnail,
//         code,
//         stock
//     ){
//         const newProduct = {title, description, price, thumbnail, code, stock}
//         if(!this.#validationProduct(newProduct))
//             return console.log('Error. Repeated Code o undefine');
        
//         this.#products = [...this.#products, {...newProduct, id: this.#generateID()}]

//     }



// }

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

//     'producto prueba',
//     'Este es un producto prueba',
//     220,
//     'Sin imagen',
//     'abc123',
//     25

// )


// // console.log(productManager.getProductById(1))


// // productManager.getProductById(2)
