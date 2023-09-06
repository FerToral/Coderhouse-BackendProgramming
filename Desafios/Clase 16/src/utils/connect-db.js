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
