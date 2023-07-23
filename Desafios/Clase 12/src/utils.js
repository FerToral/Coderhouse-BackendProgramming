//@ts-check
import { fileURLToPath } from "url";
import {dirname} from "path";
import multer from 'multer';
import { CartManagerMongo } from "./services/cartsManagerMongo.js";
import { ProductManagerMongo } from "./services/productManagerMongo.js";
import { UserService } from "./services/users.service.js";

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

export const cartManagerMongo = new CartManagerMongo();
export const productManagerMongo = new ProductManagerMongo();
export const userService = new UserService();



/* BCRYPT */
import bcrypt from 'bcrypt';
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);
