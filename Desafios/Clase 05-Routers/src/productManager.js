

//@ts-check

import * as fs from "fs";

export class ProductManager {
    #products = [];
    #idIncremental=0;
    constructor(filePath){
        this.path = filePath;
        if (!fs.existsSync(this.path))
            fs.writeFileSync(this.path, "[]");
        const productsString =  fs.readFileSync(this.path,'utf-8');
        this.#products = productsString==''?[]:JSON.parse(productsString);
        this.calculateIdIncremental();
     
    }
    calculateIdIncremental() {
        if (this.#products.length !== 0) {
            this.#idIncremental = this.#products.reduce((max, prod) => (prod.id > max ? prod.id : max), 0);
        }
    }
    async getProducts(){
        const productsString = await fs.promises.readFile(this.path, 'utf-8');
        this.#products = JSON.parse(productsString);
        return this.#products;
    }
    async getProductById(id){
        const productsString = await fs.promises.readFile(this.path, 'utf-8');
        this.#products = JSON.parse(productsString);
        const search = this.#products.find(product => product.id == id)
        return search??false;
    }
    async updateProduct(id, campo){
        this.#products = this.#products.map(p => p.id == id?{...p, ...campo, id: p.id}:p);
        const productsString = JSON.stringify(this.#products);
        await fs.promises.writeFile(this.path, productsString);
           
    }
    async deleteProduct(id){
        this.#products = this.#products.filter(p => p.id != id)
        const productsString = JSON.stringify(this.#products);
        await fs.promises.writeFile(this.path, productsString);
       
    }
    #validationProduct(newProduct){
        const codeRepeate = this.#products.find(prod => prod.code == newProduct.code)?true:false;
        const allValuesExist = Object.entries(newProduct).every(([key, value]) => key === 'thumbnails' || (!!value && value !== ''));

        if(codeRepeate){
            console.log('Error. Repeated Product Code')
        }
        if(!allValuesExist){
            console.log('Error. Entering empty, null or undefined fields')
        }

        return (!codeRepeate && allValuesExist );
    }
    #generateID(){

        return this.#idIncremental++;  
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
        const newProduct = {title, description, price, thumbnail, code, stock, status, category}
        if(this.#validationProduct(newProduct)){
            this.#products = [...this.#products, {...newProduct, id: this.#generateID()}]
            const productsString = JSON.stringify(this.#products);
            await fs.promises.writeFile(this.path, productsString);
        }
        else{
            throw new Error('Error adding product')
        }
    
    
    }
}
