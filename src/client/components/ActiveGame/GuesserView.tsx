import React, { ChangeEvent, useState } from 'react';
import { Socket } from 'socket.io-client';
import PreviousQuestions from './PreviousQuestions';
import events from '../../../global/events';
import { Question } from '../../../global/types';

type GuesserViewProps = {
    currentQuestion: string;
    answeredQuestions: Question[];
    gameId: string;
    socket: Socket;
};

const GuesserView = ({
    answeredQuestions,
    currentQuestion,
    gameId,
    socket
}: GuesserViewProps): JSX.Element => {
    const [question, setQuestion] = useState('');
    const [guess, setGuess] = useState('');

    const askQuestion = () => {
        socket.emit(events.ASK_QUESTION, { gameId, question });
    };

    const submitGuess = () => {
        socket.emit(events.SUBMIT_GUESS, { gameId, guess });
    };

    const onQuestionChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setQuestion(e.target.value);
    };

    const onGuessChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setGuess(e.target.value);
    };

    return (
        <div>
            <h3>Active Game</h3>
            <h4>You are guessing</h4>
            <PreviousQuestions answeredQuestions={answeredQuestions} />
            {
                currentQuestion
                    ? <p>Current Question: {currentQuestion}</p>
                    : <div className='display-flex'>
                        <input
                            className='margin-right-small'
                            onChange={onQuestionChange}
                            placeholder='Ask a question...'
                            type='text'
                        ></input>
                        <button onClick={askQuestion}>Ask</button>
                    </div>
            }
            <div className='display-flex'>
                <p className='margin-right-small'>Solve:</p>
                <input
                    className='margin-right-small'
                    onChange={onGuessChange}
                    placeholder='Try to solve the puzzle...'
                    type='text'
                ></input>
                <button onClick={submitGuess}>Submit</button>
            </div>
        </div>
    );
};

export default GuesserView;