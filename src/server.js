const express = require('express');
const session = require('express-session');
const app = express();
const http = require('http');
const { dbConnection } = require('./db/dbConfij');
const orderModel = require('./model/Order');

const PORT = 5000;
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

const sessionMiddleware = session({
      secret: 'tadhaduied82983794',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 300000 },
});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/chat', async (req, res) => {
      const sessionId = req.body.sessionId;
      const message = req.body.message;

      // TODO: handle session management here

      if (message === '1') {
            // handle order placement
            let order = await orderModel.findOne({
                  sessionId: sessionId,
                  status: 'in progress',
            });

            if (!order) {
                  order = new Order({ sessionId: sessionId });
            }

            // TODO: retrieve list of menu items from the database and send to the user
            // once the user selects the items they want to order, add them to the order and save it to the database
            order.items = ['item 1', 'item 2', 'item 3'];
            await order.save();
      } else if (message === '99') {
            // handle order checkout
            const order = await orderModel.findOne({
                  sessionId: sessionId,
                  status: 'in progress',
            });

            if (order) {
                  order.status = 'completed';
                  await order.save();
                  res.json({ message: 'Order placed' });
            } else {
                  res.json({ message: 'No order to place' });
            }
      } else if (message === '98') {
            // handle order history
            const orders = await orderModel.find({ sessionId: sessionId });
            // TODO: format the list of orders and send to the user
      } else if (message === '97') {
            // handle current order
            const order = await Order.findOne({
                  sessionId: sessionId,
                  status: 'in progress',
            });

            if (order) {
                  // TODO: format the current order and send to the user
            } else {
                  res.json({ message: 'No current order' });
            }
      } else if (message === '0') {
            // handle order cancellation
            const order = await Order.findOne({
                  sessionId: sessionId,
                  status: 'in progress',
            });

            if (order) {
                  await order.remove();
                  res.json({ message: 'Order cancelled' });
            } else {
                  res.json({ message: 'No order to cancel' });
            }
      } else {
            // handle invalid input
      }
});

app.listen(PORT, async () => {
      await dbConnection();
      console.log(`Server listening on ${PORT}`);
});
