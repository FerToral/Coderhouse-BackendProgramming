
const express = require('express');
const app = express();
const port = 3000;

app.get("/", (req,res) => {
    res.send();
})

app.get("/bienvenida", (req,res) => {
    res.send('./bienvenida.html');
})


app.get("/usuario", (req,res) => {
    res.send({
        nombre: "Fer",
        apellido: "Toralez",
        edad: 22,
        correo: "sadasdasdasd@gmail.com",
      });
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})