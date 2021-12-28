import { Server, Socket } from 'socket.io';
import { uuid } from 'uuidv4';

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
    
        socket.on('CREATE_GAME', (data) => {
            const gameId = uuid();
            const { name } = data;

            games[gameId] = { players: [{ id: playerId, name }] };
            activePlayers[playerId].games.push(gameId);

            console.log('Game created', gameId, games[gameId]);
    
            socket.emit('GAME_CREATED', gameId);
        });
    });
};

export default configureSocket;