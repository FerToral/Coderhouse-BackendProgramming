//@ts-check
import { fileURLToPath } from "url";
import {dirname} from "path";
import multer from 'multer';
import { CartService} from "../services/carts.service.js";
import { ProductService} from "../services/products.service.js";
import { UserService } from "../services/users.service.js";

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, __dirname+'/public/img')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})

export const uploader = multer({storage});
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);


/* MiS SERVICIOS MANAGER */

export const cartService = new CartService();
export const productService = new ProductService();
export const userService = new UserService();

