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
        const onPlayerJoined = (player) => {
            setPlayers([...players, player]);
        };

        const onPlayerLeft = (player) => {
            const newPlayers = players.filter(({ id }) => id !== player.id);

            setPlayers(newPlayers);
        };

        if (socket) {
            socket.on(events.PLAYER_JOINED, onPlayerJoined);
            socket.on(events.PLAYER_LEFT, onPlayerLeft);

            return () => {
                socket.off(events.PLAYER_JOINED, onPlayerJoined);
                socket.off(events.PLAYER_LEFT, onPlayerLeft);
            };
        }
    }, [players, setPlayers, socket]);

    return (
        <div>
            <h1>20 Questions</h1>
            <h2>Game ID - {gameId}</h2>
            <hr />
            <div className='game-container'>
                {!joined && <JoinGameForm gameId={gameId} setJoined={setJoined} socket={socket} />}
                <PlayersList players={players} />
            </div>
        </div>
    );
};

export default Game;