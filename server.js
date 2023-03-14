const express = require('express');
const http = require('http');
const path = require('path');
const session = require('express-session');
const FoodItems = require('./helper/ListOfMenu.json');
const { formatMessageAndTime } = require('./helper/formatMessage');
require('dotenv').config();

// PORT Number
const PORT = 3000 || process.env.PORT;

// initializing app and socket.io
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

// session-middleware
const sessionMiddleWare = session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true,
});

app.use(sessionMiddleWare);
io.use((socket, next) => {
      return sessionMiddleWare(socket.request, socket.request.res, next);
});

// run when client connect
io.on('connection', (socket) => {
      console.log('a user connected', socket.id);

      const botName = 'Chat-Grill';
      const orderHistory = [];

      const botMessage = (message) => {
            socket.emit('bot-message', formatMessageAndTime(botName, message));
      };

      botMessage(
            `Hello there!! \uD83D\uDE03, <br> Welcome to ${botName}..<br> What is you Name?`
      );

      socket.request.session.currentOrder = [];
      let userName = '';

      socket.on('chat-message', (msg) => {
            if (!userName) {
                  userName = msg;
                  io.emit('bot-message', formatMessageAndTime(userName, msg));
                  botMessage(
                        `Welcome,<b>${userName}</b>. <br /><br />
         <b>press 1</b> To place an order,
        <br />To see your current order, <b> press 97</b>. 
        <br />To see your order history, <b>press 98</b>. 
        <br />To checkout your order, <b>press 99</b>. 
        <br /><b>Press 0</b> to cancel.`
                  );
            } else {
                  io.emit('bot-message', formatMessageAndTime(userName, msg));
                  switch (msg) {
                        case '1':
                              const menuOption = FoodItems.map(
                                    (item) =>
                                          `<li> Select<b> ${item.id}</b> for <b>${item.food}</b></li>`
                              ).join('\n');

                              botMessage(` The following is a list of the available items.:
            <ul>
            ${menuOption}
            </ul>`);
                              break;
                        case '5':
                        case '6':
                        case '7':
                        case '8':
                        case '9':
                        case '10':
                              const userInput = Number(msg);
                              const menu = FoodItems.find(
                                    (item) => item.id === userInput
                              );
                              if (menu) {
                                    socket.request.session.currentOrder.push(
                                          menu
                                    );
                                    botMessage(
                                          `${menu.food} has been put in your shopping cart..
              <br /><br />
             Do you wish to add to your shopping cart? if so, please respond with the corresponding number.
              <br /><br />
              If not, hit 97 to view the items in your cart or 99 to check out your order.`
                                    );
                              } else {
                                    botMessage(
                                          '<b>Invalid Input...\u{1F622}</b>'
                                    );
                              }
                              break;
                        case '97':
                              if (
                                    socket.request.session.currentOrder
                                          .length === 0
                              ) {
                                    botMessage(
                                          'Oops!! Cart is empty. Please place an order in the cart.'
                                    );
                              } else {
                                    const currentOrderText =
                                          socket.request.session.currentOrder
                                                .map((item) => item.food)
                                                .join(', ');
                                    botMessage(
                                          `Your current order(s):<br/><br/> ${currentOrderText}`
                                    );
                              }
                              break;
                        case '98':
                              if (!orderHistory.length) {
                                    botMessage(
                                          'Your order history is empty. Kindly place an order now...'
                                    );
                              } else {
                                    const orderHistoryText = orderHistory
                                          .map(
                                                (order, index) =>
                                                      `Order ${index + 1}: ${
                                                            order.food
                                                      }<br/>`
                                          )
                                          .join('\n');

                                    botMessage(
                                          `Your order history: <br/><br/>${orderHistoryText}`
                                    );
                              }
                              break;
                        case '99':
                              if (
                                    socket.request.session.currentOrder
                                          .length === 0
                              ) {
                                    botMessage(
                                          'Oops!!! Orders cannot be placed with an empty cart. Please add to your shopping basket.'
                                    );
                              } else {
                                    orderHistory.push(
                                          ...socket.request.session.currentOrder
                                    );
                                    botMessage('Order placed!!');
                                    socket.request.session.currentOrder = [];
                              }
                              break;
                        case '0':
                              if (
                                    socket.request.session.currentOrder
                                          .length === 0
                              ) {
                                    botMessage(
                                          'Cart empty! No order to cancel'
                                    );
                              } else {
                                    socket.request.session.currentOrder = [];
                                    botMessage(
                                          'Order cancelled! You can still place an order.<br /><br /> Press 1 to see menu'
                                    );
                              }
                              break;
                        default:
                              botMessage('Invalid selection. Please try again');
                  }
            }
      });

      socket.on('disconnect', () => {
            console.log('user disconnected');
      });
});

server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
});
