const express = require('express');
const serverless = require('serverless-http');

const app = express();

// Middleware and routes for Express
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello from Express!" });
});

// Use serverless-http to wrap the Express app
module.exports.handler = serverless(app);
