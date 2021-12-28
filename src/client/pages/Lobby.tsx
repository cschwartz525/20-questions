import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Lobby = ({ socket }) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');

    useEffect(() => {
        const onGameCreated = (gameId) => {
            navigate(`/game/${gameId}`);
        };

        if (socket) {
            socket.on('GAME_CREATED', onGameCreated);

            return () => {
                socket.off('GAME_CREATED', onGameCreated);
            };
        }
    }, [socket]);

    const createGame = (): void => {
        socket.emit('CREATE_GAME', { name });
    };

    const onNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
    };
    
    return (
        <div>
            <h1>20 Questions</h1>
            <h2>The classic multiplayer guessing game</h2>
            <hr />
            <h3>Start New Game</h3>
            <input onChange={onNameChange} placeholder='Enter your name' type='text' value={name} />
            <button onClick={createGame}>Create Game</button>
            <hr />
            <h3>Join Existing Game</h3>
            <p>To join an ongoing game, enter the URL in the address bar</p>
        </div>
    );
};

export default Lobby;