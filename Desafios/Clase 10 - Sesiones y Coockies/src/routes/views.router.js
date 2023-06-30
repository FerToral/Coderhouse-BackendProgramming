//@ts-check
import express from 'express';
import { cartManagerMongo, productManagerMongo } from '../utils.js';
 
const viewsRouter = express.Router();


/* VISTA HOME */
viewsRouter.get("/", async (req, res) => {
    const productsMongo = await productManagerMongo.getProducts();
    const products = productsMongo.map(product => product.toObject());;

    res.render("home", {products})
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
    try{
        const productsMongo = await productManagerMongo.getProducts();
        const products = productsMongo.map(product => product.toObject());;

        return res.render('realTimeProducts',{products: products});
        
    }catch(error){
        res.status(500).json({ success: "false", msg: "Error"});
    }
});

viewsRouter.get("/chat", async (req, res) => {
    res.render("chat", {});
});

viewsRouter.get('/products', async (req, res) => {
    let { limit, page, sort, query } = req.query;

    const paginationProducts = await productManagerMongo.paginationProduct(limit, page, query, sort);
    console.log(paginationProducts)
    const listProducts = paginationProducts.docs.map(product => product.toObject());;
    return res.render('products', {
      paginationProducts,
      listProducts
   
    });
});

viewsRouter.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const productFound = await productManagerMongo.getProductById(pid);
    const product = productFound.toObject();
    console.log(product)
    return res.render('product-id-details', {
      product
    });
  });
  
  
  viewsRouter.get('/carts/:cid', async (req, res) => {
    const cId = req.params.cid;
    const cartFound = await cartManagerMongo.getCartByIdPopulate(cId);
    const cartProducts = cartFound.products.map(prod => {
      const { product, quantity } = prod;
      const populatedProduct = product.toObject();
      return { ...populatedProduct, quantity };
    });
  
    return res.render('cart', {
      cartProducts,
    });
  });
  
  
  viewsRouter.get("/chat", async (req, res) => {
    res.render("chat", {});
  });
export default viewsRouter;