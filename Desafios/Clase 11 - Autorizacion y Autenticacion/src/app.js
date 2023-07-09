//@ts-check
import express from "express";
import handlebars from 'express-handlebars';
import {__dirname, cartManagerMongo, connectMongo, connectSocket, productManagerMongo} from './utils.js';
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import {usersRouter} from "./routes/users.router.js";
import { usersHtmlRouter } from './routes/users.html.router.js';
import { authRouter } from './routes/auth.router.js';
import cartsRouter from "./routes/carts.router.js";
import MongoStore from 'connect-mongo';
import cookieParser from "cookie-parser";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import session from 'express-session';
import { sessionsRouter } from "./routes/sessions.router.js";



const app = express();
const port = 8080;
const httpServer = app.listen(port, () => {
  console.log(`Server runing on port http://localhost:${port}`)
});

connectMongo();
connectSocket(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://fernandojosetoralez:53XqqoJQriX69dpU@backend-cluster.10rbwrs.mongodb.net/?retryWrites=true&w=majority', ttl: 86400 * 7 }),
    secret: 'un-re-secreto',
    resave: true,
    saveUninitialized: true,
  })
);

// TODO LO DE PASSPORT
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

/* CONFIGURACION DEL MOTOR DE HANDLEBARS */
app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine', 'handlebars');

/* ARCHIVOS PUBLICOS */
app.use(express.static(__dirname+'/public'));


/* ENDPOINTS */
app.use('/', viewsRouter);
app.use('/api/sessions/', sessionsRouter);
app.use('/auth', authRouter)
app.use('/api/products/', productsRouter);
app.use('/api/carts/', cartsRouter);
app.use('/api/users',usersRouter);
app.use('/users', usersHtmlRouter);

app.get("*", (req, res) => {
  res.status(404).json({ status: "error", msg: "Page not found" });
});


