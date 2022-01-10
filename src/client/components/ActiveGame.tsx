import React from 'react';
import { Player } from '../../global/types';

type ActiveGameProps = {
    answer?: string;
    guesser: Player;
    playerId?: string;
};

const ActiveGame = ({ answer, guesser, playerId }: ActiveGameProps) => {
    if (!guesser) {
        return <div></div>;
    }

    const isGuesser = guesser.id === playerId;

    if (isGuesser) {
        return (
            <div>
                <h3>Active Game</h3>
                <h4>You are guessing</h4>
                <input placeholder='Ask a question...' type='text'></input>
            </div>
        );
    } else {
        return (
            <div>
                <h3>Active Game</h3>
                <h4>{guesser.name} is guessing</h4>
                <h4>Answer: <b>{answer}</b></h4>
            </div>
        );
    }
};

export default ActiveGame;