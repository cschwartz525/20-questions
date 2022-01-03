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

                // Publish a PLAYER_LEFT event to notify other clients
                io.sockets.emit(events.PLAYER_LEFT, { gameId, playerId });
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

            const newPlayer = db.joinGame(gameId, playerId, name);

            console.log(`Player ${playerId} (${name}) joined game ${gameId}`);

            // Respond to the player who just joined with a PLAYER_JOINED event
            socket.emit(events.PLAYER_JOINED, { gameId, player: { ...newPlayer, isMe: true } });

            // Notify other players via a PLAYER_JOINED event
            socket.broadcast.emit(events.PLAYER_JOINED, { gameId, player: { ...newPlayer, isMe: false } });
        });

        socket.on(events.REQUEST_GAME_STATE, (data) =>{
            const { gameId } = data;

            const game = db.getGame(gameId);

            socket.emit(events.GAME_STATE_ACKNOWLEDGED, game);
        });

        socket.on(events.START_GAME, (data) =>{
            const { gameId } = data;

            const game = db.startGame(gameId);

            console.log('Game started', gameId);

            io.sockets.emit(events.GAME_STARTED, game);
        });
    });
};

export default configureSocket;