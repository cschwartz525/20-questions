import { Socket } from 'socket.io';
import { uuid } from 'uuidv4';
import events from '../global/events';
import type { Game } from '../global/types';

class DB {

    activePlayers: Record<string, { games: string[]; socket: Socket; }>;
    games: Record<string, Game>;

    constructor() {
        this.activePlayers = {};
        this.games = {};

        this.createActivePlayer = this.createActivePlayer.bind(this);
        this.createGame = this.createGame.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
        this.getActivePlayer = this.getActivePlayer.bind(this);
        this.getGame = this.getGame.bind(this);
        this.joinGame = this.joinGame.bind(this);
    }

    createActivePlayer(socket) {
        const playerId = uuid();

        this.activePlayers[playerId] = { games: [], socket };

        return playerId;
    }

    createGame() {
        const gameId = uuid();

        this.games[gameId] = { players: [] };

        return gameId;
    }

    deleteActivePlayer(playerId) {
        delete this.activePlayers[playerId];
    }

    deleteGame(gameId) {
        delete this.games[gameId];
    }

    getActivePlayer(playerId) {
        return this.activePlayers[playerId];
    }

    getGame(gameId) {
        return this.games[gameId];
    }

    joinGame(gameId, playerId, name) {
        const activePlayer = this.getActivePlayer(playerId);
        const game = this.getGame(gameId);
        const newPlayer = { id: playerId, name };

        if (activePlayer && game) {
            game.players.push(newPlayer);
            activePlayer.games.push(gameId);

            game.players.forEach(({ id }) => {
                const { socket } = this.getActivePlayer(id);

                if (id === playerId) {
                    // Respond to the player who just joined with a PLAYER_JOINED event
                    socket.emit(events.PLAYER_JOINED, { ...newPlayer, isMe: true });
                } else {
                    // Notify other players via a PLAYER_JOINED event
                    socket.emit(events.PLAYER_JOINED, { ...newPlayer, isMe: false });
                }
            });
        }
    }

    leaveGame(gameId, playerId) {
        const game = this.getGame(gameId);

        if (game) {
            const newPlayers = game.players.filter(player => player.id !== playerId);

            // If there are no players left in the game, delete the game
            if (newPlayers.length) {
                game.players = newPlayers;

                // Publish a PLAYER_LEFT event to notify other clients
                newPlayers.forEach(({ id }) => {
                    const { socket } = this.getActivePlayer(id);
                    socket.emit(events.PLAYER_LEFT, { id: playerId });
                });
            } else {
                this.deleteGame(gameId);
            }
        }
    }

}

export default new DB();