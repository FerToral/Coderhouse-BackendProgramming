//@ts-check
import express from 'express';
import { checkAdmin, checkUser } from '../middlewares/auth.js';
import { cartManagerMongo, productManagerMongo } from '../utils.js';
 
const viewsRouter = express.Router();


/* VISTA HOME */
viewsRouter.get("/", checkUser, async (req, res) => {
    const firstName = req.session.firstName;
    const email = req.session.email;
    const admin = req.session.admin;
    const productsMongo = await productManagerMongo.getProducts();
    const products = productsMongo.map(product => product.toObject());;
    res.render("home", {
      products,
      firstName,
      email,
      admin
    })
});

viewsRouter.get("/realtimeproducts", checkUser, async (req, res) => {
    const firstName = req.session.firstName;
    const email = req.session.email;
    const admin = req.session.admin;
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

viewsRouter.get('/products', checkUser, async (req, res) => {
    let { limit, page, sort, query} = req.query;
    const firstName = req.session.firstName;
    const email = req.session.email;
    const admin = req.session.admin;

    const paginationProducts = await productManagerMongo.paginationProduct(limit, page, query, sort);
    console.log(paginationProducts)
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

viewsRouter.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.render('error-page', { msg: 'no se pudo cerrar la session' });
      }
      return res.redirect('/login');
    });
  });
  
  viewsRouter.get('/login', (req, res) => {
    res.render('login-form');
  });
  
  viewsRouter.get('/register', (req, res) => {
    res.render('register-form');
  });
  
  viewsRouter.get('/profile', checkUser, (req, res) => {
    const firstName = req.session.firstName;
    const email = req.session.email;
    const admin = req.session.admin;
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