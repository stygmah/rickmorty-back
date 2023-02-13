const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = process.env.SERVER_PORT;

// Middlewares
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST");
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
db();

// Require all methods
const fullPath = path.join(__dirname, 'methods');

fs.readdirSync(fullPath).forEach((file) => {
  const httpMethod = require(`./methods/${file}`);
  const { method, endpoint, httpFunction } = httpMethod;
  console.log(`[server]: Route active: ${method.toUpperCase()}: /${endpoint}`);
  app[method](`/${endpoint}`, httpFunction);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

module.exports = app;