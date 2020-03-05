const express = require('express');
const cors = require('cors');
const routes = require('../Routes/Index');
require('../Configs/Database'); //Database Connection
const server = express();

server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));

server.use(cors());

//Route
server.use('/push', routes);

//Export
module.exports = server;