const chatForm = document.getElementById("chat-form");
const socket = io("ws://localhost:4000");

socket.on("connected", function (BotWelcomeMsg) {
  BotWelcomeMessage(BotWelcomeMsg);
});

socket.on("Botmessage", (msg) => {
  outputBot(msg);
});

// Message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const div = document.createElement("div");

  const Message = e.target.elements.inputMessage.value;

  outPutMessage(Message);

  //sending Message to the Server
  socket.emit("chatMessage", Message);

  e.target.elements.inputMessage.value = "";
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

// OutPut Message to DOM
const outPutMessage = (Message) => {
  const div = document.createElement("div");
  div.classList.add("msg-bubble");
  div.innerHTML = `<div class="msg-info">
              <!-- <div class="msg-info-name">Sajad</div> -->
            </div>
            <div class="msg-text">${Message}</div>`;
  document.getElementById("msg-right").appendChild(div);
};

const outputBot = (msg) => {
  const divElement = document.getElementById("msg-text");
  divElement.innerHTML = `<p class="h3 display-2">${msg}</p>`;
};
