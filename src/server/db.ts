import { Socket } from 'socket.io';
import { uuid } from 'uuidv4';
import data from './data.json';
import type { Game } from '../global/types';

class DB {

    activePlayers: Record<string, { games: string[]; socket: Socket; }>;
    games: Record<string, Game>;

    constructor() {
        this.activePlayers = {};
        this.games = {};

        this.answerQuestion = this.answerQuestion.bind(this);
        this.askQuestion = this.askQuestion.bind(this);
        this.createActivePlayer = this.createActivePlayer.bind(this);
        this.createGame = this.createGame.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
        this.getActivePlayer = this.getActivePlayer.bind(this);
        this.getGame = this.getGame.bind(this);
        this.joinGame = this.joinGame.bind(this);
        this.leaveGame = this.leaveGame.bind(this);
        this.startGame = this.startGame.bind(this);
        this.validateGuess = this.validateGuess.bind(this);
    }

    answerQuestion(gameId, response) {
        const game = this.getGame(gameId);

        game.answeredQuestions.push({
            question: game.currentQuestion,
            answer: response
        });

        game.currentQuestion = '';

        return game.answeredQuestions;
    }

    askQuestion(gameId, question) {
        const game = this.getGame(gameId);

        game.currentQuestion = question;
    }

    createActivePlayer(socket) {
        const playerId = uuid();

        this.activePlayers[playerId] = { games: [], socket };

        return playerId;
    }

    createGame() {
        const gameId = uuid();

        this.games[gameId] = { id: gameId, players: [] };

        return gameId;
    }

    deleteActivePlayer(playerId) {
        delete this.activePlayers[playerId];
    }

    deleteGame(gameId) {
        delete this.games[gameId];
    }

    endGame(gameId, isCorrect) {
        const game = this.getGame(gameId);

        game.endTime = Date.now();
        game.isWin = isCorrect;

        return game;
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
        }

        return newPlayer;
    }

    leaveGame(gameId, playerId) {
        const game = this.getGame(gameId);

        if (game) {
            const newPlayers = game.players.filter(player => player.id !== playerId);

            // If there are no players left in the game, delete the game
            if (newPlayers.length) {
                game.players = newPlayers;
            } else {
                this.deleteGame(gameId);
            }
        }
    }

    startGame(gameId) {
        const game = this.getGame(gameId);

        game.startTime = Date.now();

        const guesserIndex = Math.floor(Math.random() * game.players.length);

        game.guesserId = game.players[guesserIndex].id;

        const answerIndex = Math.floor(Math.random() * data.answers.length);
        const answer = data.answers[answerIndex];

        game.answer = answer;

        game.answeredQuestions = [];

        return game;
    }

    validateGuess(gameId, guess) {
        const { answer = '' } = this.getGame(gameId);

        const isCorrect = guess.toUpperCase() === answer.toUpperCase();

        return this.endGame(gameId, isCorrect);
    }

}

export default new DB();