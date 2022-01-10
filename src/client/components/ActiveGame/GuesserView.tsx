import React, { ChangeEvent, useState } from 'react';
import events from '../../../global/events';

const GuesserView = ({ currentQuestion, gameId, socket }) => {
    const [question, setQuestion] = useState('');

    const askQuestion = () => {
        socket.emit(events.ASK_QUESTION, { gameId, question })
    };

    const onQuestionChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setQuestion(e.target.value);
    };

    return (
        <div>
            <h3>Active Game</h3>
            <h4>You are guessing</h4>
            {
                currentQuestion
                    ? <p>Question: {currentQuestion}</p>
                    : <div>
                        <input onChange={onQuestionChange} placeholder='Ask a question...' type='text'></input>
                        <button onClick={askQuestion}>Ask</button>
                    </div>
            }
        </div>
    );
};

export default GuesserView;