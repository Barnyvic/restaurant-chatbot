const express = require("express");
const app = express();
const http = require("http");

const PORT = 3000;
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
