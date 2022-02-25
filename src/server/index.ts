import express, { Request, Response } from 'express';
import { createServer } from 'http';
import path from 'path';
import { Server } from 'socket.io';
import configureSocket from './socket';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const { PORT = 3000 } = process.env;

app.use(express.static('build'));

app.get('*', (req: Request, res: Response) =>{
    res.sendFile(path.join(__dirname + '/index.html'));
});

configureSocket(io);

server.listen(PORT, (): void => {
    console.log(`Server running on port ${PORT}`);
});