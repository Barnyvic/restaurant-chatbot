# Chat-Grill...

Welcome to our ChatBot interface!

You may place orders, checkout orders, view your order history, and cancel
orders all in one spot with the help of our ChatBot, which has an intuitive user
interface. To offer a seamless experience, our ChatBot saves your session based
on devices.

---

## Requirements

- ChatBot interface would be like a chat interface
- No need for authentication but we should be able to store user session based
  on devices
- When a customer lands on the chatbot page, the bot should send these options
  to the customer: <br> a. Select 1 to Place an order <br> b. Select 99 to
  checkout order <br> c. Select 98 to see order history <br> d. Select 97 to see
  current order <br> e. Select 0 to cancel order
- When a customer selects “1”, the bot should return a list of items from the
  restaurant. It is up to you to create the items in your restaurant for the
  customer. The order items can have multiple options but the customer should be
  able to select the preferred items from the list using this same number select
  system and place an order.
- When a customer selects “99” out an order, the bot should respond with
  “order placed” and if none the bot should respond with “No order to place”.
  Customer should also see an option to place a new order
- When a customer selects “98”, the bot should be able to return all placed
  order
- When a customer selects “97”, the bot should be able to return current order
- When a customer selects “0”, the bot should cancel the order if there is.

---

## Set-up

> > Clone the repository from github to your local computer,

> > cd into the folder,

> > run yarn to install update the node_module,

> > run yarn dev to start the server with nodemon.

> > run yarn start to start the server with node.

---

## Getting started...


To get started

- the chatbot will tell you to input your name ,  followed by a list of options:


- Select 1 to Place an order
- Select 99 to checkout order-
- Select 98 to see order history
- Select 97 to see current order
- Select 0 to cancel order

When you select "1", our ChatBot will return a list of items from the
restaurant. You can select your preferred items from the list using the same
number select system and place an order.

When you select "99" to checkout an order, our ChatBot will respond with "order
placed". If there is no order to place, the ChatBot will respond with "No order
to place". You will also see an option to place a new order.

When you select "98", the ChatBot will return all placed orders.

When you select "97", the ChatBot will return your current order.

When you select "0", the ChatBot will cancel your order if there is one.

---

## Live Preview for the api

<a> https://chat-grill-spmb.onrender.com/ </a>

---


