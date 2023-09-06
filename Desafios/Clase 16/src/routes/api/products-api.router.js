//@ts-check
import { Router } from "express";
import {paginationMiddleware, validationProduct} from "../../middlewares/mw-routerproducts.js"
import { productController } from "../../controllers/products.controller.js";

const productsApiRouter = Router();

productsApiRouter.get('/', paginationMiddleware, productController.getPagination);

productsApiRouter.get('/:pid', productController.getProduct);

productsApiRouter.post('/', validationProduct, productController.post);

productsApiRouter.put('/:pid', productController.put);

productsApiRouter.delete('/:pid', productController.delete);

export default productsApiRouter;