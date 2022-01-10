import React from 'react';
import { Player } from '../../../global/types';

type ActiveGameProps = {
    answer: string;
    guesser: Player;
};

const ParticipantView = ({ answer, guesser }: ActiveGameProps) => (
    <div>
        <h3>Active Game</h3>
        <h4>{guesser.name} is guessing</h4>
        <h4>Answer: <b>{answer}</b></h4>
    </div>
);

export default ParticipantView;