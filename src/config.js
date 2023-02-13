const dotenv = require('dotenv');
dotenv.config();

const MONGO_DB_USER = process.env.MONGO_DB_USER || '';
const NODE_ENV = process.env.NODE_ENV || '';
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD || '';
const MONGO_DB_CLUSTER = process.env.MONGO_DB_CLUSTER || '';
const MONGO_URL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_CLUSTER}`;
const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
const MONGO_URL_LOCAL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.xgqwh.mongodb.net/node_boilerplate`;

const config = {
    mongo: {
        url: MONGO_URL,
    },
    server: {
        port: PORT,
    },
};

if (NODE_ENV === 'production') {
    config.mongo.url = MONGO_URL;
    config.server.port = PORT;
} else if (NODE_ENV === 'local') {
    config.mongo.url = MONGO_URL_LOCAL;
    config.server.port = PORT;
}

module.exports = config;
