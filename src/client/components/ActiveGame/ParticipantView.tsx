import React, { SyntheticEvent } from 'react';
import { Socket } from 'socket.io-client';
import PreviousQuestions from './PreviousQuestions';
import events from '../../../global/events';
import { Player, Question } from '../../../global/types';

type ActiveGameProps = {
    answer: string;
    answeredQuestions: Question[];
    currentQuestion?: string;
    gameId: string;
    guesser: Player;
    socket: Socket
};

const ParticipantView = ({
    answer,
    answeredQuestions,
    currentQuestion,
    gameId,
    guesser,
    socket
}: ActiveGameProps) => {
    const onYesNoClick = (e: SyntheticEvent<HTMLButtonElement>): void => {
        const response = e.currentTarget.name.toUpperCase();

        socket.emit(events.ANSWER_QUESTION, { gameId, response });
    };

    return (
        <div>
            <h3>Active Game</h3>
            <h4>{guesser.name} is guessing</h4>
            <h4>Answer: <b>{answer}</b></h4>
            <PreviousQuestions answeredQuestions={answeredQuestions} />
            {
                currentQuestion &&
                <div>
                    <p>Current Question: {currentQuestion}</p>
                    <button name='yes' onClick={onYesNoClick}>Yes</button>
                    <button name='no' onClick={onYesNoClick}>No</button>
                </div>
            }
        </div>
    );
};

export default ParticipantView;