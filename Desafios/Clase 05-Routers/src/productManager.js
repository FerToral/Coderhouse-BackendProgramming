

//@ts-check

import * as fs from "fs";

export class ProductManager {
    #products = [];
    #idIncremental = 0;
    constructor(path){
        this.path = path;
        if (!fs.existsSync(this.path))
            fs.writeFileSync(this.path, "[]")
        const productsString =  fs.readFileSync(this.path,'utf-8');
        this.#products = productsString==''?[]:JSON.parse(productsString);
     
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
        return search??'Not Found';
    }
    async updateProduct(id, campo){
        this.#products = this.#products.map(p => p.id == id?{...p, ...campo, id: p.id}:p);
        const productsString = JSON.stringify(this.#products);
        try {
            await fs.promises.writeFile(this.path, productsString);
           
        } catch (error) {
            
            throw new Error('Error updating product');
        }
        
    }
    async deleteProduct(id){
        this.#products = this.#products.filter(p => p.id != id)
        const productsString = JSON.stringify(this.#products);
        try {
            await fs.promises.writeFile(this.path, productsString);
           
        } catch (error) {
            
            throw new Error('Error updating product');
        }

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
    addProduct(
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
            fs.writeFileSync(this.path, productsString);
            return true;
        }
        else{
            return false;
        }
    
    
    }
}
