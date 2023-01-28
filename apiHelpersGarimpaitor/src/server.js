require('dotenv').config({ path: '.env' });

const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const authSystem = require('./app/middlewares/authSystem');

require('./database');

class Server {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use(authSystem);
    }

    routes() {
        this.server.use(routes);
    }
}

module.exports = new Server().server;
