//@ts-check
import express from "express";
import cartsRouter from "./routes/carts.router.js";
import productsRouter, { productManager } from "./routes/products.router.js";
import handlebars from 'express-handlebars';
import {__dirname, connectMongo} from './utils.js';
import {Server} from 'socket.io';
import viewsRouter from "./routes/views.router.js";
import mongoose from "mongoose";
import userRouter from "./routes/users.router.js";
import { MsgModel } from "./dao/models/msgs.model.js";


const app = express();
const port = 8080;
const httpServer = app.listen(port, () => {
  console.log(`Server runing on port http//localhost:${port}`)
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* CONFIGURACION DEL MOTORO DE HANDLEBARS */
app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine', 'handlebars');

/* ARCHIVOS PUBLICOS */
app.use(express.static(__dirname+'/public'));

/* CONEXION A MONGO */
connectMongo();

/* ENDPOINTS */
app.use('/', viewsRouter);
app.use('/api/products/', productsRouter);
app.use('/api/carts/', cartsRouter);
app.use('/api/users',userRouter);

app.get("*", (req, res) => {
  res.status(404).send({ status: "error", data: "Page not found" });
});


const socketServer = new Server(httpServer);


socketServer.on('connection', (socket) =>{
  console.log("New client conect");

  socket.on("new-product-created", async (newProduct) => {
    try{
      const {title, description, price, thumbnail, code, stock, category} = newProduct;
      const status = true;
      
      await productManager.addProduct(
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category
      )

      const productList = await productManager.getProducts();
      socketServer.emit("products", productList);

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
    await productManager.deleteProduct(idToDelete);
    socketServer.emit("delete-product-in-table", idToDelete);
  })
  
})

