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
import compression from "express-compression";
import mockingRouter from "./routes/api/mocking.router.js";
import errorHandler from "./middlewares/errors/index.js"
import { addLogger, logger } from "./utils/logger.js";
import loggerRouter from "./routes/api/logger-api.router.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import enviroment from "./config/config.js";

const app = express();
const port = enviroment.port;
app.use(compression({
  brotli:{enable:true, zlib:{}}
}))
const httpServer = app.listen(port, () => {
  logger.info(`Server runing on port http://localhost:${port}`)
});

connectSocket(httpServer);

const swaggerOptions = {
  definition:{
    openapi: '3.0.1',
    info:{
      title:"Ecommerce Coder Documentation",
      description: "API implemented with swagger to document our eccommerce project"
    }
  },
  apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions);
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

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

/* CONFIG PASSPORT */ 
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

/* CONFIGURACION DEL MOTOR DE HANDLEBARS */
app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine', 'handlebars');


/* ARCHIVOS PUBLICOS */
app.use(express.static(__dirname+'/public'));

/* LOGGER */
app.use(addLogger)


/* ENDPOINTS */
app.use('/', homeRouter);

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
app.use('/loggerTest', loggerRouter);

app.use('/register', registerRouter)
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/sessions', sessionsRouter);
app.use('/profile', profileRouter);
app.use('/users', usersHtmlRouter);
app.use('/products',productsRouter);
app.use('/carts', cartsRouter);
app.use('/chats', isUser, chatsRouter);
app.use('/mockingproducts', mockingRouter);
app.use(errorHandler);
app.get("*", (req, res) => {
  res.status(404).json({ status: "error", msg: "Page not found" });
});



