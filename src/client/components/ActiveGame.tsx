import React from 'react';
import { Player } from '../../global/types';

type ActiveGameProps = {
    guesser: Player;
};

const ActiveGame = ({ guesser }: ActiveGameProps) => (
    <div>
        <h3>Active Game</h3>
        <h4>{guesser?.name} is guessing</h4>
    </div>
);

export default ActiveGame;