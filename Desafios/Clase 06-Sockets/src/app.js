//@ts-check
import express from "express";
import cartsRouter from "./routes/carts.router.js";
import productsRouter, { productManager } from "./routes/products.router.js";
import handlebars from 'express-handlebars';
import {__dirname} from './utils.js';
import {Server} from 'socket.io';
import viewsRouter from "./routes/real-time-products.router.js";


const app = express();
const port = 8080;

const httpServer = app.listen(port, () => {
  console.log(`Server runing on port http//localhost:${port}`)
});
const socketServer = new Server(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname+'/public'));

app.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", {products})
});



app.use('/api/products/', productsRouter);
app.use('/api/carts/', cartsRouter);
app.use('/realtimeproducts', viewsRouter);

socketServer.on('conection', socket =>{
  console.log("New client conect");

  socket.on("new-product-created", async (newProduct) => {
    try{
      const { 
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category} = newProduct;

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

  socket.on("delete-product", async (idToDelete) => {
    await productManager.deleteProduct(idToDelete);
    socketServer.emit("delete-product-in-table", idToDelete);
  })

  // socket.on('message', data=>{
  //   console.log(data);
  // })
  // socket.emit('evento_para_socket_individual',' This message should only be seen by the socketa ');

  // socket.broadcast.emit('evento_para_todos_menos_el_socket_actual','Es5te evento lo veran todos los sockets conectado, menos el socket actual desde el que se envio el mensaje');

  // socketServer.emit('evento_para_todos', 'Este mensaje lo reciben todos los sockets conectados')
})

app.get("*", (req, res) => {
  res.status(404).send({ status: "error", data: "Page not found" });
});

