const chatForm = document.getElementById("chat-form");
const socket = io("ws://localhost:4000");

socket.on("connected", function (BotWelcomeMsg) {
 
});

socket.on("Botmessage", (msg) => {
});
 

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const div = document.createElement("div");

  const Message = e.target.elements.inputMessage.value;

  socket.emit("chatMessage", Message);

  e.target.elements.inputMessage.value = "";
});




