const express = require("express");
const app = express();
const port = 3000;

let productos = [
  { id: "1000000", name: "pelota boca", precio: 100000 },
  { id: "1000001", name: "pelota river", precio: -10 },
  { id: "1000002", name: "pelota tigre", precio: 5 },
];

app.get("/productos/:id", (req, res) => {
  const id = req.params.id;
  const producto = productos.find((p) => p.id == id);
  if (producto) {
    return res.json({
      status: "success",
      msg: "producto encontrado con exito",
      data: producto,
    });
  } else {
    return res.json({
      status: "error",
      msg: "no se encontro el producto",
      data: {},
    });
  }
});
app.get("/productos", (req, res) => {
    return res.json({
      status: "success",
      msg: "te paso todos los productos",
      data: productos,
    });
  });

app.get("/decimehola/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  return res.json({
    status: "success",
    msg: "hola " + nombre + ", como andas?",
    data: {},
  });

  /*
  console.log("params", req.params);
  console.log("body", req.body);
  console.log("query", req.query); 
  */
});

app.get("*", (req, res) => {
  return res.json({
    status: "error",
    msg: "error esa ruta no existe",
    data: {},
  });
  1;
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});