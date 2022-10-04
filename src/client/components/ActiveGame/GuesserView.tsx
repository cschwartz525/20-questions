import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PreviousQuestions from './PreviousQuestions';
import { selectGame } from '../../redux/selectors';
import events from '../../../global/events';

const GuesserView = (): JSX.Element => {
    const dispatch = useDispatch();
    const [question, setQuestion] = useState('');
    const [guess, setGuess] = useState('');
    const game = useSelector(selectGame);
    const { answeredQuestions, currentQuestion, id: gameId } = game || {};

    const askQuestion = () => {
        dispatch({ type: events.ASK_QUESTION, payload: { gameId, question } });
    };

    const submitGuess = () => {
        dispatch({ type: events.SUBMIT_GUESS, payload: { gameId, guess } })
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