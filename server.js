const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const session = require('express-session');

// PORT Number
const PORT = 4000;
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server, {
      cors: {
            origin: 'http://localhost:4000',
            methods: ['GET', 'POST'],
      },
});

app.use(express.static(path.join(__dirname, 'public')));

const sessionMiddleWare = session({
      secret: 'tjhbyu278492oyohrdwh8whi',
      resave: false,
      saveUninitialized: true,
      cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 90,
      },
});

app.use(sessionMiddleWare);
io.engine.use(sessionMiddleWare);

// FoodItems list

const FoodItems = {
      2: 'Pizza',
      3: 'Burger',
      4: 'Ice-cream',
      5: 'Pasta',
};

// run when client connect
io.on('connection', (socket) => {
      console.log('a user connected', socket.id);

      const session = socket.request.session;
      socket.session = socket.request.session;
      const sessionId = session.id;

      let orderHistory = [];

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

      socket.on('chat-message', (message) => {
            io.to(sessionId).emit('chat-message', message);

            switch (message) {
                  case '1':
                        const items = Object.entries(FoodItems)
                              .map(([key, value]) => `${key}. ${value}`)
                              .join('\n');

                        io.to(sessionId).emit('bot-message', {
                              sender: 'bot',
                              message: `Here is a list of items you can order:<br>${items}<br>Please select one by typing its number.`,
                        });
                        break;
                  case '2':
                  case '3':
                  case '4':
                  case '5':
                        const selectedIndex = Number(message);
                        if (FoodItems.hasOwnProperty(selectedIndex)) {
                              const selectedItem = FoodItems[selectedIndex];
                              socket.session.currentOrder =
                                    socket.session.currentOrder || [];
                              socket.session.currentOrder.push(selectedItem);
                              io.to(sessionId).emit('bot-message', {
                                    sender: 'bot',
                                    message: `${selectedItem}<b> has been added to your order...</b> <br> Do you want to add more items to your order? If not, type 99 to checkout.`,
                              });
                        }
                        break;
                  case '99':
                        if (
                              socket.session.currentOrder &&
                              socket.session.currentOrder.length
                        ) {
                              orderHistory.push(socket.session.currentOrder);
                              io.to(sessionId).emit('bot-message', {
                                    sender: 'bot',
                                    message: `<b> Order placed...</b> `,
                              });
                              delete socket.session.currentOrder;
                        }
                        break;
                  case '98':
                        if (orderHistory.length) {
                              const orderHistoryString = orderHistory
                                    .map(
                                          (order, index) =>
                                                `Order ${
                                                      index + 1
                                                }: ${order.join(', ')}`
                                    )
                                    .join('\n');

                              io.to(sessionId).emit('bot-message', {
                                    sender: 'bot',
                                    message: `Here is your order history:\n${orderHistoryString}`,
                              });
                        } else {
                              socket.emit('bot-message', {
                                    sender: 'bot',
                                    message: `No previous orders`,
                              });
                        }

                        break;
                  case '97':
                        if (
                              socket.session.currentOrder &&
                              socket.session.currentOrder.length
                        ) {
                              io.to(sessionId).emit('bot-message', {
                                    sender: 'bot',
                                    message: `Here is your current order: ${socket.session.currentOrder.join(
                                          ', '
                                    )}
              Type 99 to checkout your order or 0 to cancel.`,
                              });
                        } else {
                              io.to(sessionId).emit('bot-message', {
                                    sender: 'bot',
                                    message: `<b>No current order. Place an order\n1. See menu...</b>`,
                              });
                        }
                        break;
                  case '0':
                        if (
                              socket.session.currentOrder &&
                              socket.session.currentOrder.length
                        ) {
                              io.to(sessionId).emit('bot-message', {
                                    sender: 'bot',
                                    message: `<b>Order cancelled...</b>`,
                              });
                              delete socket.session.currentOrder;
                        } else {
                              io.to(sessionId).emit('bot-message', {
                                    sender: 'bot',
                                    message: `<b>No current order to cancel. Place an order\n1. See menu</b>`,
                              });
                        }
                        break;
                  default:
                        io.to(sessionId).emit('bot-message', {
                              sender: 'bot',
                              message: `<b>Invalid Input...</b>`,
                        });
                        break;
            }
      });

      socket.on('disconnect', () => {
            console.log('user disconnected');
      });
});

server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
});
