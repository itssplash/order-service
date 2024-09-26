// Import required modules
<<<<<<< HEAD
const express = require('express'); // Express is a minimal Node.js framework for building web applications.
const amqp = require('amqplib/callback_api'); // AMQP (Advanced Message Queuing Protocol) client library for RabbitMQ.
const cors = require('cors'); // CORS (Cross-Origin Resource Sharing) middleware for handling cross-origin requests.
require('dotenv').config(); // Load environment variables from .env file in development

const app = express(); // Create an Express application instance.
app.use(express.json()); // Middleware to parse incoming JSON request bodies.

// Enable CORS (Cross-Origin Resource Sharing) for all routes
app.use(cors());

// Get the RabbitMQ URL and the port from environment variables
const RABBITMQ_CONNECTION_STRING = process.env.RABBITMQ_CONNECTION_STRING || 'amqp://localhost';  // Fallback to localhost if not defined
const PORT = process.env.PORT || 3000;  // Fallback to port 3000 if not defined

// Define a POST route for creating orders
app.post('/orders', (req, res) => {
  const order = req.body; // Extract the order data from the request body.
  
  // Connect to RabbitMQ server
  amqp.connect(RABBITMQ_CONNECTION_STRING, (err, conn) => {
=======
const express = require('express');  // Express is a minimal Node.js framework for building web applications.
const amqp = require('amqplib/callback_api');  // AMQP (Advanced Message Queuing Protocol) client library for communicating with RabbitMQ.
const cors = require('cors');  // CORS (Cross-Origin Resource Sharing) middleware for handling cross-origin requests.

const app = express();  // Create an Express application instance.
app.use(express.json());  // Middleware to parse incoming JSON request bodies.

// Enable CORS (Cross-Origin Resource Sharing) for all routes
// This allows your API to accept requests from different origins (e.g., your frontend).
app.use(cors());

// URL for connecting to RabbitMQ (localhost means it's running locally).
const RABBITMQ_URL = 'amqp://localhost';

// Define a POST route for creating orders
// This route is accessed when a client (e.g., frontend) sends an order.
app.post('/orders', (req, res) => {
  const order = req.body;  // Extract the order data from the request body.
  
  // Connect to RabbitMQ server
  amqp.connect(RABBITMQ_URL, (err, conn) => {
>>>>>>> 967308193ec77b27a7ca91bb65f5f747d30a59ba
    if (err) {
      // If an error occurs while connecting to RabbitMQ, send a 500 status and error message.
      return res.status(500).send('Error connecting to RabbitMQ');
    }

    // Once connected to RabbitMQ, create a channel to communicate with it.
    conn.createChannel((err, channel) => {
      if (err) {
        // If an error occurs while creating a channel, send a 500 status and error message.
        return res.status(500).send('Error creating channel');
      }

<<<<<<< HEAD
      const queue = 'order_queue'; // Define the queue where the order will be sent.
      const msg = JSON.stringify(order); // Convert the order object to a JSON string.

      // Assert (create) the queue if it doesn't already exist.
=======
      const queue = 'order_queue';  // Define the queue where the order will be sent.
      const msg = JSON.stringify(order);  // Convert the order object to a JSON string.

      // Assert (create) the queue if it doesn't already exist.
      // durable: false means the queue doesn't persist after RabbitMQ restarts.
>>>>>>> 967308193ec77b27a7ca91bb65f5f747d30a59ba
      channel.assertQueue(queue, { durable: false });

      // Send the order message to the queue.
      channel.sendToQueue(queue, Buffer.from(msg));

      // Log the sent order to the console.
      console.log("Sent order to queue:", msg);

      // Send a response to the client confirming that the order was received.
      res.send('Order received');
    });
  });
});

<<<<<<< HEAD
// Start the server using the port from environment variables
app.listen(PORT, () => {
  console.log(`Order service is running on http://localhost:${PORT}`);
});
=======
// Set the port where the Express server will listen for incoming requests.
// In this case, it's running on port 3000.
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Order service is running on http://localhost:${PORT}`);
});
>>>>>>> 967308193ec77b27a7ca91bb65f5f747d30a59ba
