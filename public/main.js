const chatForm = document.getElementById('chat-form');
const Message = document.getElementById('msg');
const socket = io('ws://localhost:4000');

socket.on('bot-message', function (msg) {
    console.log(msg);
    handleUserMessage(msg);
});

socket.on('chat-message', function (msg) {
    handleUserMessage(msg);
});

const handleUserMessage = (msg) => {
    const div = document.createElement('div');
    div.classList.add('message');
    //check if the message is from the bot or the user
    if (msg.sender === 'bot') {
        div.innerHTML = `<div class="message-right">
                                        <div>
                                                <div
                                                        class="message-content"
                                                >
                                                        <p>${msg.message}</p>
                                                </div>
                                                <div class="message-meta">
                                                        <p id="time"></p>
                                                </div>
                                        </div>
                                </div> `;
    } else {
        div.innerHTML = `<div class="message-left">
                                        <div>
                                                <div
                                                        class="message-content"
                                                >
                                                        <p>${msg}</p>
                                                </div>
                                                <div class="message-meta">
                                                        <p id="time"></p>
                                                </div>
                                        </div>
                                </div>`;
    }
    //append the div to the messages div
    Message.appendChild(div);
};

// Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let Msg = e.target.elements.inputMessage.value;

    let Message = Msg.trim();

    if (!Message) {
        return false;
    }

    if (Message !== '') {
        console.log(Message);
        //sending Message to the Server
        socket.emit('chat-message', Message);
    }
    // Clear input
    e.target.elements.inputMessage.value = '';
    e.target.elements.inputMessage.focus();
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
