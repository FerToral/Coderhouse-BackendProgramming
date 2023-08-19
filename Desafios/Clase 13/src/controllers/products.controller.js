//@ts-check

import { productService } from "../utils/utils";

class ProductController{

    async renderProduct(req, res){
        const pid = req.params.pid;
        const productFound = await productService.getProductById(pid);
        const product = productService.productToObject(productFound);
    
        return res.render('product-id-details', {
            product
        });
    }

    async renderPaginationProducts(req, res){
        const { limit, page, sort, query} = req.paginationOptions;
        const { firstName, email, rol} = req.sessionData;
        
        const paginationProducts = await productService.paginationProduct(limit, page, query, sort);
        const listProducts = productService.paginationToObject(paginationProducts);
        return res.render('products', {
            paginationProducts,
            listProducts,
            firstName,
            email,
            rol
        });
    }

    async renderRealTime(req, res){
        const { firstName, email, rol} = req.sessionData;
        try{
            const products = await productService.getProducts();
            const productsToObject = productService.productsToObject(products);

            return res.render('realTimeProducts',{
                products: productsToObject,
                firstName,
                email,
                rol
            });
            
        }catch(error){
            res.status(500).json({ success: "false", msg: "Error"});
        }
    }

    async getPagination(req, res){
        const { limit, page, query, sort } = req.paginationOptions;
        try{
          const products = await productService.paginationProduct(limit, page, query, sort);
      
          return res.status(200).json({
            status: 'succesfull',
            msg: 'Product list',
            data: {
              payload: products.docs,
              totalPages: products.totalPages,
              prevPage: products.prevPage,
              nextPage: products.nextPage,
              page: products.page,
              hasPrevPage: products.hasPrevPage,
              hasNextPage: products.hasNextPage,
              prevLink: products.prevLink,
              nextLink: products.nextLink,
            },
          });
        }catch(error){
          return res.status(500).json({ status: 'Error', msg: 'Something went wrong', data: { error } });
        }
            
    }

    async getProduct(req, res){
        const id = req.params.pid;
        try{
            const filteredProduct = await productService.getProductById(id);
            res.status(200).json({ 
                status: "success", 
                data: filteredProduct});
        }catch(error){
            res.status(404).json({
                status: "error", 
                data: error.message});
        }
    }
    
    async post(req, res){
        const id = req.params.pid;

        try {
            const filteredProduct = await productService.getProductById(id);
            
            if (!filteredProduct) {
            return res.status(404).json({ status: "error", data: "Product not found" });
            }
            res.status(201).json({ status: "success", data: filteredProduct})

        } catch (error) {
            return res.status(500).json({ status: "error", data: error.message });
        }
        
    }
    
    async put(req, res){
        const pid = req.params.pid;
        const {campo } = req.body;
    
        try {
            const updatedProduct = await productService.updateProduct(pid,campo);
            res.status(200).json({ status: "success", msg: "Product updated", data: updatedProduct });
    
        } catch (error) {
            res.status(400).json({ status: "error", data: "Error updating product" });
        }
    }
    
    async delete(req, res){
        const id = req.params.pid
      
        try {
            const deletedProduct = await productService.deleteProduct(id)
            res.status(200).json({ status: "success", msg: "Removed Product", data: deletedProduct });
    
        } catch (error) {
            res.status(400).json({ status: "error", data: "Error deleting the product" });
        }
    }
    
}

export const productController = new ProductController();