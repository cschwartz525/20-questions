import { Server, Socket } from 'socket.io';
import { uuid } from 'uuidv4';
import events from '../global/events';

const activePlayers = {};
const games = {};

const configureSocket = (io: Server) => {
    io.on('connection', (socket: Socket): void => {
        const playerId = uuid();

        activePlayers[playerId] = { games: [] };

        console.log('User connected', playerId);

        socket.on('disconnect', () => {
            const gamesForPlayer = activePlayers[playerId].games;

            // Remove player from all games he / she was in
            gamesForPlayer.forEach(gameId => {
                if (games[gameId]) {
                    const newPlayers = games[gameId].players.filter(player => player.id !== playerId);

                    // If there are no players left in the game, delete the game
                    if (newPlayers.length) {
                        games[gameId].players = newPlayers;

                        // Publish a PLAYER_LEFT event to notify other clients
                        io.sockets.emit(events.PLAYER_LEFT, games[gameId].players);
                    } else {
                        delete games[gameId];
                    }
                }
            });

            // Remove player from activePlayers
            delete activePlayers[playerId];

            console.log('User disconnected', playerId);

            console.log('activePlayers', activePlayers);
            console.log('games', games);
        });

        socket.on(events.CREATE_GAME, () => {
            const gameId = uuid();

            games[gameId] = { players: [] };

            console.log('Game created', gameId, games[gameId]);

            socket.emit(events.GAME_CREATED, gameId);
        });

        socket.on(events.JOIN_GAME, (data) => {
            const { gameId, name } = data;

            games[gameId].players.push({ id: playerId, name });
            activePlayers[playerId].games.push(gameId);

            console.log(`Player ${playerId} (${name}) joined game ${gameId}`);

            io.sockets.emit(events.PLAYER_JOINED, games[gameId].players);
        });
    });
};

export default configureSocket;