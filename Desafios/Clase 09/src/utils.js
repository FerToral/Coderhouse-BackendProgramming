//@ts-check
import { fileURLToPath } from "url";
import {dirname} from "path";
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, __dirname+'/public/img')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})

export const uploader = multer({storage});
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);


import {connect} from "mongoose";
export async function connectMongo(){

    connect('mongodb+srv://fernandojosetoralez:53XqqoJQriX69dpU@backend-cluster.10rbwrs.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
    console.log('Connected to MongoDB');
    // Resto de tu código aquí
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


}