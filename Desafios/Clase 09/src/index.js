import mongoose from "mongoose";

const environment = async() =>{
    await mongoose.connect('mongodb+srv://fernandojosetoralez:53XqqoJQriX69dpU@backend-cluster.10rbwrs.mongodb.net/?retryWrites=true&w=majority')
}

environment();