//@ts-check
import express from 'express';
import { checkAdmin, checkUser, getSession } from '../../middlewares/auth.js';
import { cartManagerMongo, productManagerMongo } from '../../utils/utils.js';
import { paginationMiddlewareViews } from '../../middlewares/mw-routerviews.js'; 
 
const viewsRouter = express.Router();


/* VISTA HOME */
viewsRouter.get("/", checkUser, getSession, async (req, res) => {
  res.render("home")

});

viewsRouter.get("/realtimeproducts", checkUser, getSession, async (req, res) => {
  const { firstName, email, admin} = req.sessionData;
    try{
        const productsMongo = await productManagerMongo.getProducts();
        const products = productsMongo.map(product => product.toObject());;

        return res.render('realTimeProducts',{
          products: products,
          firstName,
          email,
          admin
        });
        
    }catch(error){
        res.status(500).json({ success: "false", msg: "Error"});
    }
});

viewsRouter.get("/chat", async (req, res) => {
    res.render("chat", {});
});

viewsRouter.get('/products', checkUser, paginationMiddlewareViews,  getSession , async (req, res) => {
    const { limit, page, sort, query} = req.paginationOptions;
    const { firstName, email, admin} = req.sessionData;
    
    const paginationProducts = await productManagerMongo.paginationProduct(limit, page, query, sort);
    const listProducts = paginationProducts.docs.map(product => product.toObject());;
    return res.render('products', {
      paginationProducts,
      listProducts,
      firstName,
      email,
      admin
      
    });
});

viewsRouter.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const productFound = await productManagerMongo.getProductById(pid);
    const product = productFound.toObject();
  
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

viewsRouter.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.render('error-page', { msg: 'no se pudo cerrar la session' });
      }
      return res.redirect('/login');
    });
  });
  
  viewsRouter.get('/login', (req, res) => {
    res.render('login-github');
  });
  
  viewsRouter.get('/register', (req, res) => {
    res.render('register-form');
  });
  
  viewsRouter.get('/profile', checkUser, getSession, (req, res) => {
    const { firstName, email, admin} = req.sessionData;
    res.render('profile', {
      firstName,
      email,
      admin
    });
  });
  
  viewsRouter.get('/solo-para-admin', checkAdmin, (req, res) => {
    res.send('ESTO SOLO LO PUEDE VER EL ADMIN');
  });
  
export default viewsRouter;