

import express from 'express'

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();
const port = 8080;


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/products/', productsRouter);
app.use('/api/carts/', cartsRouter);



app.get("*", (req, res) => {
  res.status(404).send({ status: "error", data: "Page not found" });
});

app.listen(port, () => {
    console.log(`Server runing on port http//localhost:${port}`)
});
