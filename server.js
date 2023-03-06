const express = require("express");
const app = express();
const http = require("http");
const path = require("path");

const PORT = 4000;
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

const BotWelcomeMessage = [
  {
    option: "Select 1 to Place an order",
  },
  {
    option: "Select 99 to checkout order",
  },
  {
    option: "Select 98 to see order history",
  },
  {
    option: "Select 97 to see current order",
  },
  { option: "Select 0 to cancel order" },
];

// run when client connect
io.on("connection", (socket) => {
  console.log("client connected", socket.id);

  socket.emit("connected", BotWelcomeMessage);

  // Listen for Chat Message
  socket.on("chatMessage", (message) => {
    socket.emit("Botmessage", "hello");
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
