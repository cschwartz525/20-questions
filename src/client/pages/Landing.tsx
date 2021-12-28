import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ socket }) => {
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
            <input onChange={onNameChange} type='text' value={name} />
            <button onClick={createGame}>Create Game</button>
        </div>
    );
};

export default LandingPage;