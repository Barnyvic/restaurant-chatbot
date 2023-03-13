const chatForm = document.getElementById('chat-form');
const Message = document.getElementById('msg');
const socket = io('ws://localhost:4000');

socket.on('bot-message', function (msg) {
        console.log(msg)
        handleUserMessage(msg);
});

socket.on("Botmessage", (msg) => {
  console.log(msg);
});

// Message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

        let Msg = e.target.elements.inputMessage.value;

        let Message = Msg.trim();

        if (!Message) {
                return false;
        }

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
