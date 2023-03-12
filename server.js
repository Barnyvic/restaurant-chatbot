const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const session = require('express-session');

const PORT = 4000;
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));


const sessionMiddleWare = session({
        secret: 'tjhbyu278492oyohrdwh8whi',
        resave: false,
        saveUninitialized: true,
        cookie: {
                secure: false,
                maxAge: 1000 * 60 * 60 * 24 * 7,
        },
});

app.use(sessionMiddleWare);
io.engine.use(sessionMiddleWare);


const FoodItems = {
        2: 'Item1',
        3: 'Item2',
        4: 'Item3',
        5: 'Item4',
};

// run when client connect
io.on('connection', (socket) => {
        console.log('a user connected', socket.id);

        const session = socket.request.session;
        const sessionId = session.id;

        socket.join(sessionId);

        io.to(sessionId).emit('bot-message', {
                sender: 'bot',
                message: `<b>Welcome to ChatGril...</b> <br> Pls press any of the following keys: <br>
     <b>select 1 Place Order </b> <br>
    <b>Select 99 Checkout Order </b> <br>
   <b>Select 98 Order History</b>  <br>
   <b>Select 97 See Current Order</b><br>
    <b>Select 0 Cancel Order</b> <br>`,
        });

        socket.on('chat-message', (msg) => {
                io.to(sessionId).emit('chat-message', msg);

                if (msg === '1') {
                         const items = Object.entries(FoodItems)
                                 .map(([key, value]) => `${key}. ${value}`)
                                 .join('\n');
                                 console.log(items)
                        io.to(sessionId).emit('bot-message', {
                                sender: 'bot',
                                message: `Here is a list of items you can order:<br>${items}<br>Please select one by typing its number.`,
                        });
                } else {
                        io.to(sessionId).emit('bot-message', {
                                sender: 'bot',
                                message: `<b>Invalid Input...</b>`,
                        });
                }
        });

        socket.on('disconnect', () => {
                console.log('user disconnected');
        });
});

server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
});
