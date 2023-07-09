//@ts-check
import { fileURLToPath } from "url";
import {dirname} from "path";
import multer from 'multer';
import { CartManagerMongo } from "./services/cartsManagerMongo.js";
import { ProductManagerMongo } from "./services/productManagerMongo.js";

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


/* CONEXION A MONGODB */

import {connect} from "mongoose";
import { ProductsModel } from "./dao/models/products.model.js";
import { MsgModel } from "./dao/models/msgs.model.js";
export async function connectMongo(){

    connect('mongodb+srv://fernandojosetoralez:53XqqoJQriX69dpU@backend-cluster.10rbwrs.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
    console.log('Connected to MongoDB');
    // Resto de tu código aquí
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


}


/* SERVIDOR SOCKET */

import {Server} from 'socket.io';

export async function connectSocket(httpServer){

    const socketServer = new Server(httpServer);

    socketServer.on('connection', (socket) =>{
        
        console.log("New client conect");

        socket.on("new-product-created", async (newProduct) => {
            try{
            const newProductCompleted = {
                ...newProduct,
                thumbnails: newProduct.thumbnail || [],
                status: true,
            };
            
            await productManagerMongo.addProduct(newProductCompleted)
            //Busco el último
            const latestProduct = await ProductsModel.findOne({}, {sort: {_id: -1}});
            const newProductObject = latestProduct.toObject();
            console.log(newProductObject)
            socketServer.emit("newproduct", newProductObject);

            }catch(error){
            socketServer.emit("error", error.message);
            }
            
        });

        socket.on("msg_front_to_back", async (msg) => {
            const msgCreated = await MsgModel.create(msg);
            const msgs = await MsgModel.find({});
            socketServer.sockets.emit("all_msgs", msgs);
        });

        socket.on("delete-product", async (idToDelete) => {
            await productManagerMongo.deleteProduct(idToDelete);
            socketServer.emit("delete-product-in-table", idToDelete);
        })

        socket.on("add-product", async (idToAdd,title) => {
            //Carrito Default
            const cid = '649797b077e8959bcadabdea';
            await cartManagerMongo.addProductToCart(cid,idToAdd);
            socketServer.emit("notification-add-success", title);  
        })
        
    })
}

/* BCRYPT */
import bcrypt from 'bcrypt';
import { UserService } from "./services/users.service.js";
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);
