import mongoose from "mongoose";
import config from "../config/config";

export let Users;
export let Products;
export let Carts;
export let Chats;

switch(config.persistence){
    case "MONGO":
        const connection = mongoose.connect('mongodb+srv://fernandojosetoralez:53XqqoJQriX69dpU@backend-cluster.10rbwrs.mongodb.net/?retryWrites=true&w=majority');
        const {default:UsersMongo} = await import('./mongo/users.mongo.js');
        Users = UsersMongo;

        const {default:ProductsMongo} = await import('./mongo/products.mongo.js');
        Products = ProductsMongo;

        const {default:CartsMongo} = await import('./mongo/carts.mongo.js');
        Carts = CartsMongo;

        const {default:ChatsMongo} = await import('./mongo/chats.mongo.js');
        Chats = ChatsMongo;
        
        break;
    
    case "MEMORY":
        const {default:UsersMemory} = await import('./users.memory.js');
        Users = UsersMemory;
        break;
}