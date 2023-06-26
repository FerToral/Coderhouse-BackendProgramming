//@ts-check
const socket = io();
let formProducts = document.getElementById("form-products")
let titleInput = document.getElementById('title-product');
let priceInput = document.getElementById('price-product');
let categoryInput = document.getElementById('category-product');
let stockInput = document.getElementById('stock-product');
let codeInput = document.getElementById('code-product');
let thumbnailInput = document.getElementById('thumbnail-product');
let descriptionInput = document.getElementById('description-product');
let btnsDelete = document.querySelectorAll(".btn-delete");
setDelete(btnsDelete);


formProducts.addEventListener("submit", (event) => {
    event.preventDefault();
    let newProduct = {
        title: titleInput.value,
        price: priceInput.value,
        category: categoryInput.value,
        stock: stockInput.value,
        code: codeInput.value,
        thumbnails: thumbnailInput.value,
        description: descriptionInput.value,        
    };

    socket.emit("new-product-created", newProduct);

});

socket.on("newproduct", (product) =>{
    createRow(product);
    btnsDelete = document.querySelectorAll(".btn-delete");
    setDelete(btnsDelete)
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
  

function createRow(product) {
  const container = document.getElementById("list-products");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <th scope="row">{{@index}}</th>
    <td>${product.title}</td>
    <td>${product.description}</td>
    <td>${product.price}</td>
    <td>${product.code}</td>
    <td>${product.stock}</td>
    <td>${product.category}</td>
    <td><a href="${product.thumbnail}">Product's Image</a></td>
    <td> <button type="button" class="btn btn-danger btn-delete" value=${product._id}>Delete</button>
    </td>`;
  container.appendChild(newRow); // Agregar la nueva fila al contenedor

} 
function setDelete(btnDelete) {
  for (let btn of btnDelete) {
    btn.addEventListener("click", () => {
      Swal.fire({
        title: 'Do you want to delete',
        text: `you are going to delete the product with the ID: "${btn.value}"`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          let idToDelete = btn.value
          socket.emit("delete-product", idToDelete)
          Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
          )
        }
      })
    });
  };
}

socket.on("delete-product-in-table", (idToDelete) => {
    btnsDelete = document.querySelectorAll(".btn-delete");
    for (let btn of btnsDelete) {
      if (btn.value == idToDelete) {
        let hijo = btn.parentNode;
        let padre = hijo.parentNode;
        padre.remove()
      }
    }
  })