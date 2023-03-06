const chatForm = document.getElementById("chat-form");
const socket = io("ws://localhost:4000");

socket.on("connected", function (BotWelcomeMsg) {
  BotWelcomeMessage(BotWelcomeMsg);
});

socket.on("Botmessage", (msg) => {
  console.log(msg);
});

// Message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const Message = e.target.elements.inputMessage.value;

  //sending Message to the Server
  socket.emit("chatMessage", Message);
});


//welcome Message of the bot
const BotWelcomeMessage = (BotWelcomeMsg) => {
  const divElement = document.getElementById("msg-text");

  divElement.innerHTML = `
   <p class="h3 display-2"> Welcome to ChatGrill</p>
   ${BotWelcomeMsg.map(
     (item) =>
       `
        <ul class="list-group"><li class="list-group-item fw-bold h-5">${item.option}</li> </ul>`
   ).join("")}
  `;
};
