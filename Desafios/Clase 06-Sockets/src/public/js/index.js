//@ts-check
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
    const lastProduct = products[products.length - 1];
    const container = document.getElementById("container-list-products");
    const data = createList(lastProduct);
    container.append(data);
    const btnsDelete = document.querySelectorAll(".btn-delete");
    setDelete(btnDeletes)
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
  

function createList(product) {
    const data = document.createElement("ul");
    data.innerHTML = `

    <li class="list-group-item">Title: ${product.title}</li>
    <li class="list-group-item">Description: ${product.descripcion}</li>
    <li class="list-group-item">Price: ${product.price}</li>
    <li class="list-group-item">Code: ${product.code}</li>
    <li class="list-group-item">Stock: ${product.stock}</li>
    <li class="list-group-item">Category:${product.category}</li>
    <li class="list-group-item">Thumbnail:<a href="${product.thumbnail}">Product's Image</a></li>

      <li><button type="button" class="btn btn-danger" value=${product.id}>Delete</button>
      </li>
    `;
    return data;
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
  
  setDelete(btnDelete);
  
  socket.on("delete-product-in-table", (idToDelete) => {
    btnDelete = document.querySelectorAll(".btn-delete");
    for (let btn of btnDelete) {
      if (btn.value == idToDelete) {
        let hijo = btn.parentNode;
        let padre = hijo.parentNode;
        padre.remove()
      }
    }
  })