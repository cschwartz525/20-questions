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

        socket.on(events.ANSWER_QUESTION, (data) => {
            const { gameId, response } = data;

            const answeredQuestions = db.answerQuestion(gameId, response);

            io.sockets.emit(events.QUESTION_ANSWERED, { gameId, answeredQuestions });
        });

        socket.on(events.ASK_QUESTION, (data) => {
            const { gameId, question } = data;

            db.askQuestion(gameId, question);

            io.sockets.emit(events.QUESTION_ASKED, { gameId, question });
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

        socket.on(events.REQUEST_GAME_STATE, (data) => {
            const { gameId } = data;

            const game = db.getGame(gameId);

            socket.emit(events.GAME_STATE_ACKNOWLEDGED, game);
        });

        socket.on(events.RESTART_GAME, (data) => {
            const { gameId } = data;

            const game = db.restartGame(gameId);

            console.log('New game started', gameId);

            io.sockets.emit(events.GAME_STARTED, game);
        });

        socket.on(events.START_GAME, (data) => {
            const { gameId } = data;

            const game = db.startGame(gameId);

            console.log('Game started', gameId);

            io.sockets.emit(events.GAME_STARTED, game);
        });

        socket.on(events.SUBMIT_GUESS, (data) => {
            const { gameId, guess } = data;

            const game = db.validateGuess(gameId, guess);

            // Respond to the player who just guessed with a GUESS_VALIDATED event
            socket.emit(events.GUESS_VALIDATED, { game, gameId, guess, isGuesser: true });

            // Notify other players via a GUESS_VALIDATED event
            socket.broadcast.emit(events.GUESS_VALIDATED, { game, gameId, guess, isGuesser: false });
        });
    });
};

export default configureSocket;