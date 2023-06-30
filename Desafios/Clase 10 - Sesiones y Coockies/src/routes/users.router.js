import {Router} from 'express'
import { userModel } from '../dao/models/user.model.js'

const userRouter = Router();

userRouter.get('/', async (req,res)=>{

    try{
        let users = await userModel.find();
        res.send({result:"success", payload:users})
    }catch(error){
        console.log(`Cannot get users with mongoose ${error}`)
    }
})

export default userRouter;