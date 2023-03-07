const express = require("express");
const session = require("express-session");
const app = express();
const http = require("http");
const BotWelcomeMessage = require("../data");

const PORT = 4000;
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const sessionMiddleware = session({
  secret: "tadhaduied82983794",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 300000 },
});

app.use(express.static("public"));

io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next);
});

// run when client connect
io.on("connection", (socket) => {
  socket.request.session.socketId = socket.id;
  socket.request.session.save();
  console.log("client connected");

  socket.emit("connected", BotWelcomeMessage);

  // Listen for Chat Message
  socket.on("chatMessage", (message) => {
    const myArray = ["1", "99", "98", "97", "0"];
    if (message.includes(myArray)) {
      console.log("yes");
    } else {
      socket.emit("Botmessage", "Wrong");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
