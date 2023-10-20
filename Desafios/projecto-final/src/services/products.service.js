//@ts-check

import { ProductsModel } from "../dao/models/products.model.js";
import { productDao } from "../dao/factory.js";

export class ProductService {
    #products=[];
    constructor(){
     
    }

    async paginationProduct(limit, page, query, sort) {
        
        const options = {
          limit: limit,
          page: page,
          ...query,
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
        this.#products = await productDao.getAll()
        return this.#products;
    }
    
    async getProductById(id){
        try{
            const search = await productDao.getById(id);
            if(!search)
                throw new Error('Product not found'); 
            return search;
       
        }catch(error){
            throw error
        }
        
    }
    async updateProduct(id, updateData){
        await productDao.updateById(id, updateData)
   
    }
    async deleteProduct(id){
        await productDao.deleteById(id);
    }
    async #validationProduct(newProduct){
        const search = await productDao.updateById(newProduct.code);
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
            await productDao.create(newProduct)
        }catch(error){
            throw new Error(`${error.message}. Error adding product to MongoDB`)
        }
        
    
    }
}
