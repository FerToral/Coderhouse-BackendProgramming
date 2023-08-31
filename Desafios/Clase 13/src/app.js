//@ts-check
import express from "express";
import session from 'express-session';
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import MongoStore from 'connect-mongo';
import cookieParser from "cookie-parser";
import handlebars from 'express-handlebars';
import {__dirname} from './utils/utils.js';
import { connectSocket } from "./utils/connect-socket.js";
import { connectMongo } from "./utils/connect-db.js";
import productsApiRouter from "./routes/api/products-api.router.js";
import {usersApiRouter} from "./routes/api/users-api.router.js";
import cartsApiRouter from "./routes/api/carts-api.router.js";
import sessionsApiRouter from "./routes/api/sessions-api.router.js";
import registerRouter from './routes/views/register.router.js';
import sessionsRouter from "./routes/views/sessions.router.js";
import loginRouter from "./routes/views/login.router.js";
import logoutRouter from "./routes/views/logout.router.js";
import productsRouter from "./routes/views/products.router.js"
import { usersHtmlRouter } from './routes/views/users.html.router.js';
import viewsRouter from "./routes/views/views.router.js";
import homeRouter from "./routes/views/home.router.js";
import profileRouter from "./routes/views/profile.router.js";
import cartsRouter from "./routes/views/carts.router.js";
import chatsRouter from "./routes/views/chats.router.js";
import { UserDTO } from "./dtos/userDTO.js";
import { isAdmin, isUser } from "./middlewares/auth.js";

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
    secret: 'jhasdkjh671246JHDAhjd',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
      mongoUrl: 'mongodb+srv://fernandojosetoralez:53XqqoJQriX69dpU@backend-cluster.10rbwrs.mongodb.net/?retryWrites=true&w=majority', 
      ttl: 86400 * 7 
    }),
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
app.use('/api/sessions', sessionsApiRouter);
app.use('/api/products', isAdmin, productsApiRouter);
app.use('/api/carts', isUser, cartsApiRouter);
app.use('/api/users',usersApiRouter);
app.use('/api/sessions/current', (req, res) => {
  const sesion = new UserDTO(req.session.user)
  return res.status(200).json({
    status: 'success',
    msg: 'datos de la session',
    payload: sesion,
  });
});

app.use('/register', registerRouter)
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/sessions', sessionsRouter);
app.use('/home', homeRouter);
app.use('/profile', profileRouter);
app.use('/users', usersHtmlRouter);
app.use('/products',productsRouter);
app.use('/carts', cartsRouter);
app.use('/chats', isUser, chatsRouter);

app.get("*", (req, res) => {
  res.status(404).json({ status: "error", msg: "Page not found" });
});


