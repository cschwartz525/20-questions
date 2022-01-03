import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ActiveGame from '../components/ActiveGame';
import JoinGameForm from '../components/JoinGameForm';
import PlayersList from '../components/PlayersList';
import events from '../../global/events';

const Game = ({ socket }) => {
    const { gameId } = useParams();
    const [initialized, setInitialized] = useState(false);
    const [isInProgress, setIsInProgress] = useState(false);
    const [joined, setJoined] = useState(false);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const onGameStarted = (data) => {
            if (gameId === data?.gameId) {
                setIsInProgress(true);
            }
        };

        const onGameStateAcknowledged = (game) => {
            const { endTime, players = [], startTime } = game;
            const currentTime = Date.now();

            setIsInProgress(!endTime && currentTime > startTime);
            setPlayers(players);
        };

        const onPlayerJoined = (data) => {
            if (gameId === data?.gameId) {
                setPlayers([...players, data?.player]);
            }
        };

        const onPlayerLeft = (data) => {
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
                {joined && isInProgress && <ActiveGame />}
                {joined && !isInProgress && <button onClick={startGame}>Start Game</button>}
                {!joined && isInProgress && <h3>Game is in progress...</h3>}
                {!joined && <JoinGameForm gameId={gameId} setJoined={setJoined} socket={socket} />}
                <PlayersList players={players} />
            </div>
        </div>
    );
};

export default Game;