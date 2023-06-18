//@ts-check

import { ProductsModel } from "../models/products.model";

export class ProductManagerMongo {
    #products=[];
    constructor(){
     
    }
    
    async getProducts(){
        this.#products = await ProductsModel.find({});
        return this.#products;
    }
    async getProductById(id){
        const search = await ProductsModel.find({_id:id});
        return search.length != 0? search: (()=> {throw new Error('Product not Found')})
       
    }
    async updateProduct(id, campo){
        ProductsModel.updateOne({_id:id}, campo)
   
    }
    async deleteProduct(id){
        ProductsModel.deleteOne({_id:id})
    }
    async #validationProduct(newProduct){
        const search = await ProductsModel.find({code: newProduct.code});
        const codeRepeate = search.length > 0?true:false;
        const allValuesExist = Object.entries(newProduct).every(([key, value]) => key === 'thumbnails' || (!!value && value !== ''));

        if(codeRepeate){
            console.log();
            throw new Error('Error. Repeated Product Code');
        }
        if(!allValuesExist){
            throw new Error('Error. Entering empty, null or undefined fields');
        }

    
    }
    async addProduct(
        title,
        description,
        price,
        thumbnails,
        code,
        stock,
        status,
        category
    ){
        try{
            const newProduct = {title, description, price, thumbnails, code, stock, status, category}
            this.#validationProduct(newProduct);
            await ProductsModel.create(newProduct)
        }catch(error){
            throw new Error(`${error.message}. Error adding product`)
        }
        
    
    }
}
