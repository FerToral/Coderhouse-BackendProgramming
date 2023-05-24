//@ts-check

import { Router } from "express";
import { Cart } from "../carts";
import * as fs from "fs";
const cartsRouter = Router();
const cartsPath = '../../carts.json'

cartsRouter.get('/', async (req,res)=>{
   
    
})

cartsRouter.get('/:pid', async (req,res)=>{
  const id = req.params.pid;
  try{
    const cartsString = await fs.promises.readFile(cartsPath, 'utf-8');
    const carts = JSON.parse(cartsString);
    const foundCart = carts.find(cart => cart.id == id )
    
    if(!foundCart){
      res.status(404).send({status: "error", data: "Cart not found"});
      return;
    }
    res.status(201).json(foundCart);
  
  } catch(error){
    res.status(400).send({status: "error" , data: "Error retrieving cart" });
  }
  

})

cartsRouter.post('/',   async (req, res) => {
  const newCart = new Cart();
  try{
  
    const cartsString = await fs.promises.readFile(cartsPath, 'utf-8');
    const cartsArray = [...JSON.parse(cartsString), newCart];
    const newCartsString = JSON.stringify(cartsArray);
    await fs.promises.writeFile(cartsPath, newCartsString);
    res.status(201).json(newCart);


  } catch(error){
    res.status(400).send({status: "error" , data: "Error creating product" });
  }
    

});

cartsRouter.put('/:pid',   async (req, res) => {
   


});

cartsRouter.delete('/:pid',   async (req, res) => {

      

});





export default cartsRouter;