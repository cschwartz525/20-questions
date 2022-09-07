import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import Title from '../components/Title';
import events from '../../global/events';

type LobbyPageProps = {
    socket: Socket;
};

const LobbyPage = ({ socket }: LobbyPageProps) => {
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
    }, [navigate, socket]);

    const createGame = (): void => {
        socket.emit(events.CREATE_GAME);
    };

    return (
        <div id='lobby'>
            <Title />
            <h2>The classic multiplayer guessing game</h2>
            <h3>Start New Game</h3>
            <button onClick={createGame}>Create Game</button>
            <h3>- OR -</h3>
            <h3>Join Existing Game</h3>
            <p>To join an ongoing game, enter the URL in the address bar</p>
        </div>
    );
};

export default LobbyPage;