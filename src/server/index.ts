import express from 'express';
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

const { PORT = 3000 } = process.env;

app.use(express.static('build'));

io.on('connection', (socket: Socket): void => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('message', (message) => {
        console.log('message', message);

        socket.emit('message', { sender: 'Server', text: 'yo' });
    });
});

server.listen(PORT, (): void => {
    console.log(`Server running on port ${PORT}`);
});