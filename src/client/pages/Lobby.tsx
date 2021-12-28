import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import events from '../../global/events';

const Lobby = ({ socket }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const onGameCreated = (gameId) => {
            navigate(`/game/${gameId}`);
        };

        if (socket) {
            socket.on(events.GAME_CREATED, onGameCreated);

            return () => {
                socket.off(events.GAME_CREATED, onGameCreated);
            };
        }
    }, [socket]);

    const createGame = (): void => {
        socket.emit(events.CREATE_GAME);
    };
    
    return (
        <div>
            <h1>20 Questions</h1>
            <h2>The classic multiplayer guessing game</h2>
            <hr />
            <h3>Start New Game</h3>
            <button onClick={createGame}>Create Game</button>
            <hr />
            <h3>Join Existing Game</h3>
            <p>To join an ongoing game, enter the URL in the address bar</p>
        </div>
    );
};

export default Lobby;