//@ts-check

import {Server} from 'socket.io';
import { cartService, productService } from './utils.js';
import { ProductsModel } from "../dao/models/products.model.js";
import { MsgModel } from "../dao/models/msgs.model.js";

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
            
            await productService.addProduct(newProductCompleted)
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
            await productService.deleteProduct(idToDelete);
            socketServer.emit("delete-product-in-table", idToDelete);
        })

        socket.on("add-product", async (idToAdd,title) => {
            //Carrito Default
            const cid = '649797b077e8959bcadabdea';
            await cartService.addProductToCart(cid,idToAdd);
            socketServer.emit("notification-add-success", title);  
        })
        
    })
}
