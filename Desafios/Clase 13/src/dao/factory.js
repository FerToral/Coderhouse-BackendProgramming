import mongoose from "mongoose";
import config from "../config/config";

export let Users;

switch(config.persistence){
    case "MONGO":
        const connection = mongoose.connect('mongodb+srv://fernandojosetoralez:53XqqoJQriX69dpU@backend-cluster.10rbwrs.mongodb.net/?retryWrites=true&w=majority');
        const {default:UsersMongo} = await import('./mongo/users.mongo.js');
        Users = UsersMongo;
        break;
    
    case "MEMORY":
        const {default:UsersMemory} = await import('./users.memory.js');
        Users = UsersMemory;
        break;
}