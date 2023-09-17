const socket = io();
let btnAddProduct = document.querySelectorAll(".btn-add-product");
setDelete(btnAddProduct);


function setDelete(btnAddProduct) {
    for (let btn of btnAddProduct) {
      btn.addEventListener("click", () => { 
        const idToAdd = btn.value;
        const title = btn.dataset.title;
        socket.emit("add-product", idToAdd, title)
        });
    };
};
  
socket.on("notification-add-success", (title) => {
    Swal.fire(
        {
            title: 'Added!',
            text: `Your ${title} has been added.`,
            icon:'success',
            showConfirmButton: false,
            timer: 1500
        }   
    )
});