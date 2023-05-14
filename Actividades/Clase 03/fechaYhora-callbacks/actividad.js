// Realizar un programa que cree un archivo en el cual escriba la fecha y la hora actual. Posteriormente leer el archivo y mostrar el contenido por consola. 
// Utilizar el módulo fs y sus operaciones de tipo callback.


const fs = require('fs');
fs.writeFile('./fechaYhoraConCallbacks.txt','La fecha y hora actual es: ',(error)=>{
    if(error) return console.log('Error al escribir el archivo')
    let fechaYhora = new Date();
    fs.appendFile('./fechaYhoraConCallbacks.txt', fechaYhora.toString(), (error)=>{
        if(error) return console.log('Error al agregar contenido')
        fs.readFile('./fechaYhoraConCallbacks.txt','utf-8',(error,resultado)=>{
            if(error) return console.log('Error en la lectura')
        console.log(resultado)
        fs.unlink('./fechaYhoraConCallbacks.txt', (error)=>{
            if(error) return console.log('No se pudo eliminar el archivo')
        })
        })
    })
})