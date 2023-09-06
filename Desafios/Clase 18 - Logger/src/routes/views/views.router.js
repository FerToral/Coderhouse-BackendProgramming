//@ts-check
import express from 'express';
import { checkAdmin, checkUser, getSession } from '../../middlewares/auth.js';
import { cartService, productService } from '../../utils/utils.js';
import { paginationMiddlewareViews } from '../../middlewares/mw-routerviews.js'; 
 
const viewsRouter = express.Router();


/* VISTA HOME */

  
  viewsRouter.get('/solo-para-admin', checkAdmin, (req, res) => {
    res.send('ESTO SOLO LO PUEDE VER EL ADMIN');
  });
  
export default viewsRouter;