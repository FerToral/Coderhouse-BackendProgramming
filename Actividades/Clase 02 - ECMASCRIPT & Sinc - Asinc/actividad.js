// Descripción de la actividad. 
// Dados los objetos indicados en la siguientes :
// ✓ Realizar una lista nueva (array) que contenga todos los tipos de productos (no cantidades), 
// consejo: utilizar Object.keys y Array.includes. Mostrar el array por consola.
// ✓ Posteriormente, obtener el total de productos vendidos por todos los objetos (utilizar 
// Object.values)

const objetos = [
    {
        manzanas:3,
        peras:2,
        carne:1,
        jugos:5,
        dulces:2
    },
    {
        manzanas:1,
        sandias:1,
        huevos:6,
        jugos:1,
        panes:4
    }
]

const productoA = {
    manzanas:3,
    peras:2,
    carne:1,
    jugos:5,
    dulces:2
}

const productB = {
 
    
    manzanas:1,
    sandias:1,
    huevos:6,
    jugos:1,
    panes:4

}




let listadoDeProductos = [] 
let cantidadTotal = 0
objetos.forEach(objeto =>
    {
        Object.keys(objeto).forEach(tipo =>  // [manzanas, peras...,dulces]
            {
                if(!listadoDeProductos.includes(tipo)){
                    listadoDeProductos.push(tipo);
                }
            });
        Object.values(objeto).forEach(cant => {
            cantidadTotal+=cant
        })
    })

console.log(listadoDeProductos,cantidadTotal)