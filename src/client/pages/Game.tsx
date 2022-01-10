import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ActiveGame from '../components/ActiveGame';
import JoinGameForm from '../components/JoinGameForm';
import PlayersList from '../components/PlayersList';
import events from '../../global/events';
import { Game, Player } from '../../global/types';
import { Socket } from 'socket.io-client';

type GamePageProps = {
    socket: Socket;
};

const GamePage = ({ socket }: GamePageProps) => {
    const { gameId } = useParams();
    const [answer, setAnswer] = useState(null);
    const [guesser, setGuesser] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [isInProgress, setIsInProgress] = useState(false);
    const [joined, setJoined] = useState(false);
    const [playerId, setPlayerId] = useState(null);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const onGameStarted = (data: Game): void => {
            if (gameId === data?.id) {
                const guesser = players.find(({ id }) => id === data?.guesserId);
                const me = players.find(player => player.isMe);

                setIsInProgress(true);
                setPlayerId(me?.id);
                setGuesser(guesser);
                setAnswer(data.answer);
            }
        };

        const onGameStateAcknowledged = (game: Game): void => {
            const { answer, endTime, guesserId, players = [], startTime } = game;
            const currentTime = Date.now();
            const me = players.find(player => player.isMe);

            setIsInProgress(!endTime && currentTime > startTime);
            setPlayers(players);
            setPlayerId(me?.id);
            setAnswer(answer);

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

        if (socket) {
            socket.on(events.GAME_STARTED, onGameStarted);
            socket.on(events.GAME_STATE_ACKNOWLEDGED, onGameStateAcknowledged);
            socket.on(events.PLAYER_JOINED, onPlayerJoined);
            socket.on(events.PLAYER_LEFT, onPlayerLeft);

            if (!initialized) {
                socket.emit(events.REQUEST_GAME_STATE, { gameId });
                setInitialized(true);
            }

            return () => {
                socket.off(events.GAME_STARTED, onGameStarted);
                socket.off(events.GAME_STATE_ACKNOWLEDGED, onGameStateAcknowledged);
                socket.off(events.PLAYER_JOINED, onPlayerJoined);
                socket.off(events.PLAYER_LEFT, onPlayerLeft);
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

    return (
        <div>
            <h1>20 Questions</h1>
            <h2>Game ID - {gameId}</h2>
            <hr />
            <div className='game-container'>
                {joined && isInProgress && <ActiveGame answer={answer} guesser={guesser} playerId={playerId} />}
                {joined && !isInProgress && <button onClick={startGame}>Start Game</button>}
                {!joined && isInProgress && <h3>Game is in progress...</h3>}
                {!joined && <JoinGameForm gameId={gameId} setJoined={setJoined} socket={socket} />}
                <PlayersList guesser={guesser} players={players} />
            </div>
        </div>
    );
};

export default GamePage;