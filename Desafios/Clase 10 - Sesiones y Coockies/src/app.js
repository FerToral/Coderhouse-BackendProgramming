//@ts-check
import express from "express";
import handlebars from 'express-handlebars';
import {__dirname, cartManagerMongo, connectMongo, productManagerMongo} from './utils.js';
import {Server} from 'socket.io';
import { MsgModel } from "./dao/models/msgs.model.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import {usersRouter} from "./routes/users.router.js";
import { usersHtmlRouter } from './routes/users.html.router.js';
import { loginRouter } from './routes/login.router.js';
import cartsRouter from "./routes/carts.router.js";
import { ProductsModel } from "./dao/models/products.model.js";
import MongoStore from 'connect-mongo';
import cookieParser from "cookie-parser";
import session from 'express-session';
import FileStore from 'session-file-store';

const FileStoreSession = FileStore(session);
const app = express();
const port = 8080;
const httpServer = app.listen(port, () => {
  console.log(`Server runing on port http//localhost:${port}`)
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://fernandojosetoralez:53XqqoJQriX69dpU@backend-cluster.10rbwrs.mongodb.net/?retryWrites=true&w=majority', ttl: 86400 * 7 }),
    secret: 'un-re-secreto',
    resave: true,
    saveUninitialized: true,
  })
);

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
app.use('/api/users',usersRouter);
app.use('/api/sessions/', loginRouter);
app.use('/users', usersHtmlRouter);

app.get("*", (req, res) => {
  res.status(404).send({ status: "error", data: "Page not found" });
});


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
      socketServer.emit("newproduct", newProduct);

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

