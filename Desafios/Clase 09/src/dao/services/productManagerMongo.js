//@ts-check

import { ProductsModel } from "../models/products.model.js";

export class ProductManagerMongo {
    #products=[];
    constructor(){
     
    }
    async paginationProduct(limit, page, query, sort) {
        const queryDefined = query ? (typeof query === 'boolean' ? { 'status': query } : { 'category': query }) : {};
      
        const options = {
          limit: limit,
          page: page,
          ...queryDefined, // Spread operator to include the defined query in options
          sort: sort // Optionally include sorting options if needed
        };
      
        const products = await ProductsModel.paginate({}, options);
      
        const setLinks = () => {
          let prevLink = '';
          let nextLink = '';
      
          products.hasNextPage ? (nextLink = `http://localhost:8080/api/products?page=${products.nextPage}`) : (nextLink = null);
          products.hasPrevPage ? (prevLink = `http://localhost:8080/api/products?page=${products.prevPage}`) : (prevLink = null);
          products.prevLink = prevLink;
          products.nextLink = nextLink;
          return products;
        };
        setLinks();
      
        return products;
      }
      
    
    async getProducts(){
        this.#products = await ProductsModel.find({});
        return this.#products;
    }
    
    async getProductsdasds(){
        this.#products = await ProductsModel.paginate
        return this.#products;
    }
    async getProductById(id){
        const search = await ProductsModel.findById(id);
        return search? search: (()=> {throw new Error('Product not Found')})
       
    }
    async updateProduct(id, campo){
        await ProductsModel.updateOne({_id:id}, campo);
   
    }
    async deleteProduct(id){
        await ProductsModel.deleteOne({_id:id})
    }
    async #validationProduct(newProduct){
        console.log(newProduct)
        const search = await ProductsModel.find({"code": newProduct.code});
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
    async addProduct(newProduct){
        try{
            await this.#validationProduct(newProduct);
            await ProductsModel.create(newProduct)
        }catch(error){
            throw new Error(`${error.message}. Error adding product to MongoDB`)
        }
        
    
    }
}
