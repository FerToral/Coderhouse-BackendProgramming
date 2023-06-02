import express from 'express';

const viewsRouter = express.Router();

views.get('/',(req,res)=>{

    res.render('index',{
        user: "Fer",
        last_name: "Toralez",
        role:"admin",
        style: 'index.css'
    })
})

views.get('/realtimeproducts',(req,res)=>{

    res.render('index',{
        body: home.handlebars,
        style: 'index.css'
    })
})

export default viewsRouter;