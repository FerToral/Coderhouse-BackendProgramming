//@ts-check
import express from 'express';
import { productManager } from "./products.router.js";
 
const viewsRouter = express.Router();


/* VISTA HOME */
viewsRouter.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("home", {products})
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
    try{
        const products = await productManager.getProducts();
        return res.render('realTimeProducts',{products: products});
        
    }catch(error){
        res.status(500).json({ success: "false", msg: "Error"});
    }
});

viewsRouter.get("/chat", async (req, res) => {
    res.render("chat", {});
});

viewsRouter.get("/chat", async (req, res) => {
    res.render("chat", {});
  });
export default viewsRouter;