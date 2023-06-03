const socket = io();

let titleInput = document.getElementById('title-product');
let priceInput = document.getElementById('price-product');
let categoryInput = document.getElementById('category-product');
let stockInput = document.getElementById('stock-product');
let codeInput = document.getElementById('code-product');
let thumbnailInput = document.getElementById('thumbnail-product');
let descriptionInput = document.getElementById('description-product');


formProducts.addEventListener("submit", (event) => {
    event.preventDefault();
    let newProduct = {
        title: titleInput.value,
        price: price.value,
        category: categoryInput.value,
        stock: stockInput.value,
        code: codeInput.value,
        thumbnail: thumbnailInput.value,
        description: descriptionInput.value,        
    };

    socket.emit("new-product-created", newProduct);

});

socket.on("products", (products) =>{
    
})

socket.on("error", function(errorMessage) {
    // Manejar el mensaje de error recibido
    Swal.fire({
        title: errorMessage,
        text: "Please change product parameters",
        icon: 'warning',
    })
    console.error("Error: " + errorMessage);

});
  

// socket.on('evento_para_socket_individual', data=>{
//     console.log(data);
// })

// socket.on('evento_para_todos_menos_el_socket_actual',data=>{
//     console.log(data);
// })

// socket.on('evento_para_todos',data=>{
//     console.log(data);
// })