//@ts-check
import { fileURLToPath } from "url";
import path, {dirname} from "path";
import multer from 'multer';
import { CartService} from "../services/carts.service.js";
import { ProductService} from "../services/products.service.js";
import { UserService } from "../services/users.service.js";
import { TicketService } from "../services/tickets.service.js";

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, __dirname+'/public/img')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})

export const uploader = multer({storage});

//Modificado para poder funcionar dentro de la carpeta Utils
// export const __filename = fileURLToPath(import.meta.url);
// export const __dirname = dirname(__filename);

export const __filename = fileURLToPath(import.meta.url);
const __dirnameCurrent = dirname(__filename);
export const __dirname = path.resolve(__dirnameCurrent, '..')


/* MiS SERVICIOS MANAGER */

export const cartService = new CartService();
export const productService = new ProductService();
export const userService = new UserService();
export const ticketService = new TicketService();

