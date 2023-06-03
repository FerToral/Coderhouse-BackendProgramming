

//@ts-check

import * as fs from "fs";

export class ProductManager {
    #products=[];
    #idIncremental=-1;
    constructor(filePath){
        this.path = filePath;
        this.#ensureFileExist();
        this.#loadProductsFromFile();
        this.#calculateIdIncremental();
     
    }
    #ensureFileExist(){
        if (!fs.existsSync(this.path))
            fs.writeFileSync(this.path, "[]");
    }
    async #loadProductsFromFile(){
        const productsString =  await fs.promises.readFile(this.path,'utf-8');
        this.#products = JSON.parse(productsString);
    }
    async #writeProductsToFile(){
        const productsString = JSON.stringify(this.#products);
        await fs.promises.writeFile(this.path, productsString);
    }
    #calculateIdIncremental() {
        this.#idIncremental = this.#products.reduce((idMax, prod) => (parseInt(prod.id) > idMax ? prod.id : idMax), 0);
    }
    
    async getProducts(){
        this.#loadProductsFromFile();
        return this.#products;
    }
    async getProductById(id){
        this.#loadProductsFromFile();
        const search = this.#products.find(product => product.id == id)
        return search !== 'undefine'? search: (()=> {throw new Error('Product not Found')})
       
    }
    async updateProduct(id, campo){
        const { title, description, price, thumbnail, code, stock, category, status } = campo;
        this._products = this.#products.map(p => p.id == id ? { ...p, title, description, price, thumbnail, code, stock, category, status } : p);
        this.#writeProductsToFile();
           
    }
    async deleteProduct(id){
        this.#products = this.#products.filter(p => p.id != id)
        this.#writeProductsToFile();
       
    }
    #validationProduct(newProduct){
        const codeRepeate = this.#products.find(prod => prod.code == newProduct.code)?true:false;
        const allValuesExist = Object.entries(newProduct).every(([key, value]) => key === 'thumbnails' || (!!value && value !== ''));
        console.log(newProduct)
        if(codeRepeate){
            console.log();
            throw new Error('Error. Repeated Product Code');
        }
        if(!allValuesExist){
            throw new Error('Error. Entering empty, null or undefined fields');
        }

    
    }
    #generateID(){
        return ++this.#idIncremental;  
        
    }
    async addProduct(
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category
    ){
        try{
            const newProduct = {title, description, price, thumbnail, code, stock, status, category}
            this.#validationProduct(newProduct);
            this.#products = [...this.#products, {...newProduct, id: this.#generateID().toString}]
            this.#writeProductsToFile();
        }catch(error){
            throw new Error(`${error.message}. Error adding product`)
        }
        
    
    }
}
