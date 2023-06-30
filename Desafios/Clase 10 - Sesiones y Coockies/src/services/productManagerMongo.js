//@ts-check

import { ProductsModel } from "../dao/models/products.model.js";

export class ProductManagerMongo {
    #products=[];
    constructor(){
     
    }
    async paginationProduct(limit, page, query, sort) {
        const queryDefined = query ? ( query === 'true' || query === 'false' ? { 'status': query } : { 'category': query }) : {};
        
        const options = {
          limit: limit,
          page: page,
          ...queryDefined,
          sort: sort
        };
      
        const products = await ProductsModel.paginate({}, options);
        const setLinks = () => {
          let prevLink = '';
          let nextLink = '';
      
          products.hasNextPage ? (nextLink = `?limit=${limit}&page=${products.nextPage}&query=${query}&sort=${sort}`) : (nextLink = null);
          products.hasPrevPage ? (prevLink = `?limit=${limit}&page=${products.prevPage}&query=${query}&sort=${sort}`) : (prevLink = null);
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
    
    async getProductById(id){
        try{
            const search = await ProductsModel.findById(id);
            if(!search)
                throw new Error('Product not found'); 
            return search;
       
        }catch(error){
            throw error
        }
        
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
