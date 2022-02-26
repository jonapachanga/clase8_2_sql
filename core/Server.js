const express = require('express');
const Socket = require('../utils/socket');

module.exports = class Server {
    constructor() {
        this.app = express();
        this.port = process.env.APP_PORT;
        this.productsRoute = '/api/products';

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    routes() {
        this.app.use(this.productsRoute, require('../routes/product.routes'));
    }

    listen() {
        const httpServer = this.app.listen(this.port, () => {
            console.log(`Listen on: http://localhost:${ this.port }`);
        })

        this.app.on('error', error => console.log(`Server error ${ error }`))

        const socket = new Socket(httpServer);

        socket.init();
    }
}