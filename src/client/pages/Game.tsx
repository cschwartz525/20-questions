import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Socket } from 'socket.io-client';
import ActiveGame from '../components/ActiveGame';
import JoinGameForm from '../components/JoinGameForm';
import MobileToggle from '../components/MobileToggle';
import PlayersList from '../components/PlayersList';
import Title from '../components/Title';
import events from '../../global/events';
import { Game, Player, Question } from '../../global/types';

type GamePageProps = {
    socket: Socket;
};

const GamePage = ({ socket }: GamePageProps) => {
    const { gameId } = useParams();
    const [answer, setAnswer] = useState(null);
    const [answeredQuestions, setAnsweredQuestions] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [guesser, setGuesser] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const [isInProgress, setIsInProgress] = useState(false);
    const [joined, setJoined] = useState(false);
    const [playerId, setPlayerId] = useState('');
    const [players, setPlayers] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const onGameStarted = (data: Game): void => {
            if (gameId === data?.id) {
                const guesser = players.find(({ id }) => id === data?.guesserId);
                const me = players.find(player => player.isMe);

                setIsInProgress(true);
                setPlayerId(me?.id);
                setGuesser(guesser);
                setAnswer(data.answer);
                setAnsweredQuestions([]);
            }
        };

        const onGameStateAcknowledged = (game: Game): void => {
            const { answer, answeredQuestions, endTime, guesserId, players = [], startTime } = game;
            const currentTime = Date.now();
            const me = players.find(player => player.isMe);

            setIsInProgress(!endTime && currentTime > startTime);
            setPlayers(players);
            setPlayerId(me?.id);
            setAnswer(answer);
            setAnsweredQuestions(answeredQuestions);

            if (guesserId) {
                const guesser = players.find(({ id }) => id === guesserId);

                setGuesser(guesser);
            }
        };

        const onPlayerJoined = (data: { gameId: string; player: Player }): void => {
            if (gameId === data?.gameId) {
                setPlayers([...players, data?.player]);

                const me = players.find(player => player.isMe);

                setPlayerId(me?.id);
            }
        };

        const onPlayerLeft = (data: { gameId: string; playerId: string }): void => {
            if (gameId === data?.gameId) {
                const newPlayers = players.filter(({ id }) => id !== data?.playerId);

                setPlayers(newPlayers);
            }
        };

        const onQuestionAnswered = (data: { gameId: string; answeredQuestions: Question[] }): void => {
            setAnsweredQuestions(data.answeredQuestions);
            setCurrentQuestion('');
        };

        const onQuestionAsked = (data: { gameId: string; question: string }): void => {
            if (gameId === data?.gameId) {
                setCurrentQuestion(data?.question);
            }
        };

        const onGuessValidated = (data: { game: Game, gameId: string; guess: string, isGuesser: boolean }) => {
            if (gameId === data?.gameId) {
                const { game, guess, isGuesser } = data;
                const guesser = players.find(player => player.id === game.guesserId);
                const time = game.endTime - game.startTime;

                const results = [];

                results.push(`${guess} is ${game?.isWin ? 'correct' : 'incorrect'}`);
                results.push(game?.isWin
                    ? (isGuesser ? 'You won the game!' : `${guesser?.name} won the game!`)
                    : (isGuesser ? 'You lost the game!' : `${guesser?.name} lost the game!`)
                );
                results.push(`Total Time: ${time / 1000} seconds`);

                setResults(results);
                setIsInProgress(false);
                setIsEnded(true);
            }
        };

        if (socket) {
            socket.on(events.GAME_STARTED, onGameStarted);
            socket.on(events.GAME_STATE_ACKNOWLEDGED, onGameStateAcknowledged);
            socket.on(events.GUESS_VALIDATED, onGuessValidated);
            socket.on(events.PLAYER_JOINED, onPlayerJoined);
            socket.on(events.PLAYER_LEFT, onPlayerLeft);
            socket.on(events.QUESTION_ANSWERED, onQuestionAnswered);
            socket.on(events.QUESTION_ASKED, onQuestionAsked);

            if (!initialized) {
                socket.emit(events.REQUEST_GAME_STATE, { gameId });
                setInitialized(true);
            }

            return () => {
                socket.off(events.GAME_STARTED, onGameStarted);
                socket.off(events.GAME_STATE_ACKNOWLEDGED, onGameStateAcknowledged);
                socket.off(events.PLAYER_JOINED, onPlayerJoined);
                socket.off(events.PLAYER_LEFT, onPlayerLeft);
                socket.off(events.QUESTION_ANSWERED, onQuestionAnswered);
                socket.off(events.QUESTION_ASKED, onQuestionAsked);
            };
        }
    }, [
        gameId,
        initialized,
        players,
        setGuesser,
        setIsInProgress,
        setPlayers,
        socket
    ]);

    const startGame = () => {
        if (socket) {
            socket.emit(events.START_GAME, { gameId });
        }
    };

    const restartGame = () => {
        if (socket) {
            socket.emit(events.RESTART_GAME, { gameId });
        }
    };

    const toggleView = (view: string) => {
        if (view === 'game') {
            document.getElementById('game').classList.add('visible-mobile');
            document.getElementById('players').classList.remove('visible-mobile');
        } else {
            document.getElementById('players').classList.add('visible-mobile');
            document.getElementById('game').classList.remove('visible-mobile');
        }
    };

    return (
        <div>
            <Title />
            <MobileToggle toggleView={toggleView} />
            <div id='game-container'>
                <div id='game' className='visible-mobile'>
                    {
                        joined &&
                        isInProgress &&
                        <ActiveGame
                            answer={answer}
                            answeredQuestions={answeredQuestions}
                            currentQuestion={currentQuestion}
                            gameId={gameId}
                            guesser={guesser}
                            playerId={playerId}
                            socket={socket}
                        />
                    }
                    {
                        joined &&
                        !isInProgress &&
                        !isEnded &&
                        <button onClick={startGame}>Start Game</button>
                    }
                    {
                        joined &&
                        !isInProgress &&
                        isEnded &&
                        <div>
                            {results.map((line, index) => <p key={`line_${index}`}>{line}</p>)}
                            <button onClick={restartGame}>Play Again?</button>
                        </div>
                    }
                    {
                        !joined &&
                        isInProgress &&
                        <h3>Game is in progress...</h3>
                    }
                    {
                        !joined &&
                        <JoinGameForm
                            gameId={gameId}
                            setJoined={setJoined}
                            socket={socket}
                        />
                    }
                </div>
                <PlayersList
                    guesser={guesser}
                    players={players}
                />
            </div>
        </div>
    );
};

export default GamePage;