// const http = require("http")

// const server = http.createServer((req, res) => {
//     res.end("hola mundo")
// });

// server.listen(8080, () =>{
//     console.log(`Server is running on http://localhost:8080`)
// });

const express = require('express');
const app = express();
const port = 3000;

app.get("/", (req,res) => {
    res.send("Hello world");
})

app.get("/boca", (req,res) => {
    res.send("Mejor equipo");
})

app.get("/river", (req,res) => {
    res.send("Unos fantasmas");
})


app.get("*", (req,res) => {
    res.send("Ni idea pibe");
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})