const mongoose = require('mongoose');
const config = require('./config');

const connect = () => {
  mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
      console.log(`[server]: Running on ENV = ${process.env.NODE_ENV}`);
      console.log('[server]: Connected to mongoDB.');
    })
    .catch((error) => {
      console.log('[server]: Unable to connect to mongoDB.');
      console.log(error);
    });
};

module.exports = connect;
