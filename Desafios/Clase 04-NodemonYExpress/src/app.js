

import express from 'express'
import { ProductManager } from './main.js'

const app = express();
const port = 8080;
const productManager = new ProductManager('./products.json');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/products', async (req,res)=>{
    let limit = req.query.limit;
    const products = await productManager.getProducts();
    
    limit = (!limit)? products.length : limit;

    if(isNaN(limit)){
      res.status(400).send({status: "error", data: "Limit must be a Number"})
    } else if(limit < 0 || limit > products.length){
      res.status(400).send({status: "error", data: "Limit ist not in range"})
    } else {
      const productsWithLimit = products.slice(0,limit);
      res.status(200).send({ status: "success", data: productsWithLimit });
    }
    
    
})

app.get('/products/:pid', async (req,res) =>{
    
    const id = parseInt(req.params.pid);
    const filteredProduct = await productManager.getProductById(id);
    if(filteredProduct == 'Not Found'){
      res.status(404).send({status: "error", data: "Product Not Found"})
    }
    else{
      res.status(200).send({ status: "success", data: filteredProduct})
    }
 

})

app.get("*", (req, res) => {
  res.status(404).send({ status: "error", data: "Page not found" });
});

app.listen(port, () => {
    console.log(`Server runing on port http//localhost:${port}`)
});