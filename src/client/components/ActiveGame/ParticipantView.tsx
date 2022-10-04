import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PreviousQuestions from './PreviousQuestions';
import events from '../../../global/events';
import { selectGame, selectGuesser } from '../../redux/selectors';

const ParticipantView = () => {
    const dispatch = useDispatch();
    const game = useSelector(selectGame);
    const guesser = useSelector(selectGuesser);
    const {
        answer,
        answeredQuestions,
        currentQuestion,
        id: gameId
    } = game || {};

    const onYesNoClick = (e: SyntheticEvent<HTMLButtonElement>): void => {
        const response = e.currentTarget.name.toUpperCase();

        dispatch({ type: events.ANSWER_QUESTION, payload: { gameId, response } })
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