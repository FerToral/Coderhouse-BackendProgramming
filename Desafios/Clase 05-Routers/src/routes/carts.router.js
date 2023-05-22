//@ts-check

import { Router } from "express";
import { Cart } from "../carts";
import * as fs from "fs";
const cartsRouter = Router();
let cartsArray = [];
const cartsPath = '../../carts.json'

cartsRouter.get('/', async (req,res)=>{
   
    
})

cartsRouter.get('/:pid', async (req,res)=>{


})

cartsRouter.post('/',   async (req, res) => {
   
    const newCart = new Cart();
    const cartsString = await fs.promises.readFile(cartsPath, 'utf-8');
    cartsArray = JSON.parse(cartsString);
    cartsArray = [...cartsArray, newCart];
    const newCartString = JSON.stringify(this.#products);
    await fs.promises.writeFile(this.path, productsString);



      
      if(result){
        res.status(201).json(newProduct);
        productsArray.push(newProduct);
    
      }
      else{
        res.status(400).send({status: "error" , data: "Error adding product" });
      }

});

cartsRouter.put('/:pid',   async (req, res) => {
   


});

cartsRouter.delete('/:pid',   async (req, res) => {

      

});





export default cartsRouter;