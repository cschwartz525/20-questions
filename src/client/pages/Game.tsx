import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import JoinGameForm from '../components/JoinGameForm';
import PlayersList from '../components/PlayersList';
import events from '../../global/events';

const Game = ({ socket }) => {
    const { gameId } = useParams();
    const [joined, setJoined] = useState(false);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const onPlayersUpdated = (newPlayers) => {
            setPlayers(newPlayers);
        };

        if (socket) {
            socket.on(events.PLAYER_JOINED, onPlayersUpdated);
            socket.on(events.PLAYER_LEFT, onPlayersUpdated);

            return () => {
                socket.off(events.PLAYER_JOINED, onPlayersUpdated);
                socket.off(events.PLAYER_LEFT, onPlayersUpdated);
            };
        }
    }, [players, setPlayers, socket]);

    return (
        <div>
            <h1>20 Questions</h1>
            <h2>Game ID - {gameId}</h2>
            <hr />
            {
                joined
                ? <PlayersList players={players} />
                : <JoinGameForm gameId={gameId} setJoined={setJoined} socket={socket} />
            }
        </div>
    );
};

export default Game;