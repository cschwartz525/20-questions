import { Server, Socket } from 'socket.io';
import db from './db';
import events from '../global/events';

const configureSocket = (io: Server) => {
    io.on('connection', (socket: Socket): void => {
        const playerId = db.createActivePlayer(socket);

        console.log('User connected', playerId);

        socket.on('disconnect', () => {
            const activePlayer = db.getActivePlayer(playerId);
            const gamesForPlayer = activePlayer.games;

            // Remove player from all games he / she was in
            gamesForPlayer.forEach(gameId => {
                db.leaveGame(gameId, playerId);
            });

            // Remove player from activePlayers
            db.deleteActivePlayer(playerId);

            console.log('User disconnected', playerId);
        });

        socket.on(events.CREATE_GAME, () => {
            const gameId = db.createGame();

            console.log('Game created', gameId);

            socket.emit(events.GAME_CREATED, gameId);
        });

        socket.on(events.JOIN_GAME, (data) => {
            const { gameId, name } = data;

            db.joinGame(gameId, playerId, name);

            console.log(`Player ${playerId} (${name}) joined game ${gameId}`);
        });
    });
};

export default configureSocket;