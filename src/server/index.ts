import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import configureSocket from './socket';

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

configureSocket(io);

server.listen(PORT, (): void => {
    console.log(`Server running on port ${PORT}`);
});