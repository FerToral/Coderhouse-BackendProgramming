
import config from "../config/config.js";
import { connectMongo } from "../utils/connect-db.js";

export let userDao;
export let productDao;
export let cartDao;
export let chatDao;

switch(config.persistence){
    case "MONGO":
        connectMongo();
        const {default:UsersMongo} = await import('./mongo/users.mongo.js');
        userDao = UsersMongo;

        const {default:ProductsMongo} = await import('./mongo/products.mongo.js');
        Products = ProductsMongo;

        const {default:CartsMongo} = await import('./mongo/carts.mongo.js');
        Carts = CartsMongo;

        const {default:ChatsMongo} = await import('./mongo/chats.mongo.js');
        Chats = ChatsMongo;
        
        break;
    
    case "MEMORY":
        const {default:UsersMemory} = await import('./users.memory.js');
        userDao = UsersMemory;
        break;
}