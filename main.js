const Server = require('./core/Server');
const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");

const dotenv = require('dotenv');
dotenv.config();

const server = new Server();

server.app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views',
    })
);
server.app.set('view engine', 'hbs');
server.app.set('views', path.join(__dirname, "views"));

server.app.use(express.static('./public'));

server.app.get('/', function(req, res) {
    res.render('index', )
});

server.listen();
