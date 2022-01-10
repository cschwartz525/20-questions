import React from 'react';
import { Player } from '../../../global/types';

type ActiveGameProps = {
    answer: string;
    currentQuestion?: string;
    guesser: Player;
};

const ParticipantView = ({ answer, currentQuestion, guesser }: ActiveGameProps) => (
    <div>
        <h3>Active Game</h3>
        <h4>{guesser.name} is guessing</h4>
        <h4>Answer: <b>{answer}</b></h4>
        {
            currentQuestion &&
            <div>
                <p>Question: {currentQuestion}</p>
                <button>Yes</button>
                <button>No</button>
            </div>
        }
    </div>
);

export default ParticipantView;