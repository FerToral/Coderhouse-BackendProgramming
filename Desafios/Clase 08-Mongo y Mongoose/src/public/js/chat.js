const socket = io();


/* Ingreso de mail en el chat */
let email = "";
asyncWraper();

async function asyncWraper() {
  const { value: emailIngresado } = await Swal.fire({
    title: "Enter Email",
    input: "text",
    inputLabel: "Your email",
    inputValue: "",
    showCancelButton: false,
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) {
        return "Incomplete fields";
      }
    },
  });
  email = emailIngresado;
  document.getElementById("span-email").innerHTML = email;
}

/* Chats */

const chatBox = document.getElementById("input-msg");

chatBox.addEventListener("keyup", ({ key }) => {
  if (key == "Enter") {
    socket.emit("msg_front_to_back", {
      message: chatBox.value,
      user: email,
    });
    chatBox.value = "";
  }
});

socket.on("all_msgs", (msgs) => {
  const divMsgs = document.getElementById("div-msgs");
  let content = "";
  msgs.forEach((msg) => {
    if(msg.user == email){
      content = content + `<p>Yo: ${msg.message}</p>`;
    }
    else{
      content = content + `<p>${msg.user} dice: ${msg.message}</p>`;
    }
    
  });
  divMsgs.innerHTML = content;
  window.scrollTo(0, document.body.scrollHeight);
});