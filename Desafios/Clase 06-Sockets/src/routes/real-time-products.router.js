//@ts-check
import express from 'express';
import { productManager } from "./products.router.js";
 
const viewsRouter = express.Router();


viewsRouter.get('/', async (req,res)=>{

    try{
        const products = await productManager.getProducts();
        return res.render('realTimeProducts',{products: products});
        
    }catch(error){
        res.status(500).json({ success: "false", msg: "Error"});
    }
})

export default viewsRouter;