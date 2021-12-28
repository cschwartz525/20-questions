import React from 'react';
import { useParams } from 'react-router';

const Game = () => {
    const { gameId } = useParams();

    return (
        <div>
            <h1>20 Questions</h1>
            <h2>Game ID - {gameId}</h2>
        </div>
    );
};

export default Game;