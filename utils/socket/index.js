const { Server: SocketIO } = require('socket.io');
const moment = require("moment");
const mapper = require("../../utils/ObjectMapper");
const Contenedor = require("../../models/Contenedor");
const Messages = require("../../models/Messages");

const productRepository = new Contenedor('products.json');
const messagesRepository = new Messages('messages.json');

class Socket {
    static instance
    constructor(http) {
        if (Socket.instance) {
            return Socket.instance;
        }

        Socket.instance = this;
        this.io = new SocketIO(http);
    }


    init() {
        this.io.on('connection', async (socket) => {
            console.log('User connected', socket.id);

            /* ----------- Products ----------- */

            socket.emit('init', await productRepository.getAll());

            socket.on('addProduct', async (product) => {
                // Guardo el producto que se envio
                await productRepository.save(product);

                // Vuelvo a emitir todos los productos
                socket.emit('init', await productRepository.getAll());
            })

            /* ----------- Messages ----------- */

            socket.emit('retrieveMessages', await messagesRepository.getAll());

            socket.on('addMessage', async (message) => {

                message.date = moment().format('DD/MM/YYYY hh:mm:ss a').toString();

                await messagesRepository.save(message);

                socket.emit('retrieveMessages', await messagesRepository.getAll());
            })
        });
    }
}

module.exports = Socket;