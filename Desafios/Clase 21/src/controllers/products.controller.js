//@ts-check

import { ProductDTO } from "../dtos/productDTO.js";
import { productService } from "../utils/utils.js";
import { generateMockProducts } from "../utils/mocking.js";

class ProductController{

    async mockingPorduct(req, res){
        try {
            const mockProducts = await generateMockProducts(100);
            res.json(mockProducts);
        } catch (error) {
            res.status(500).json({ success: "false", msg: "Error"});
        }
       
    }

    async renderProduct(req, res){
        const pid = req.params.pid;
        const productFound = await productService.getProductById(pid);
        const product = new ProductDTO(productFound);
    
        return res.render('product-id-details', {
            product
        });
    }

    async renderPaginationProducts(req, res){
        const { limit, page, sort, query} = req.paginationOptions;
        const { firstName, email, rol} = req.sessionData;
        
        const paginationProducts = await productService.paginationProduct(limit, page, query, sort);
        const listProducts = paginationProducts.docs.map(product => new ProductDTO(product));
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
            const productsDTO = products.docs.map(product => new ProductDTO(product));
            return res.render('realTimeProducts',{
                products: productsDTO,
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
            const productsDTO = products.docs.map(product => new ProductDTO(product));
            return res.status(200).json({
                status: 'succesfull',
                msg: 'Product list',
                data: {
                payload: productsDTO,
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
            const productDTO = new ProductDTO(filteredProduct);
            
            res.status(200).json({ 
                status: "success", 
                payload: productDTO});
        }catch(error){
            res.status(404).json({
                status: "error", 
                data: error.message});
        }
    }
    
    async post(req, res){

        const newProduct = req.product;
        try{
            const productDTO = new ProductDTO(newProduct);
            await productService.addProduct(productDTO);
            req.logger.info(`Product created: ${newProduct.title}`);
            res.status(201).json({ status: "success", data: productDTO})
        
        } catch (error){
            req.logger.error(`Error when creating product: ${error.message}`);
            res.status(400).json({status: "error" , data: error.message });
        }
        
    }
    
    async put(req, res){
        const pid = req.params.pid;
        const {campo } = req.body;
    
        try {
            const updateData = new ProductDTO(campo);
            const updatedProduct = await productService.updateProduct(pid,updateData);
            req.logger.info(`Product updated, update information: ${campo}`);
            res.status(200).json({ status: "success", msg: "Product updated", data: updatedProduct });
    
        } catch (error) {
            req.logger.error(`Error when creating product: ${error.message}`);
            res.status(400).json({ status: "error", data: "Error updating product" });
        }
    }
    
    async delete(req, res){
        const id = req.params.pid
      
        try {
            const deletedProduct = await productService.deleteProduct(id)
            res.status(200).json({ status: "success", msg: "Removed Product", payload: deletedProduct });
    
        } catch (error) {
            res.status(400).json({ status: "error", data: "Error deleting the product" });
        }
    }
    
}

export const productController = new ProductController();