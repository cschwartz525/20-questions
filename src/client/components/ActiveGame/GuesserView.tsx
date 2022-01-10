import React from 'react';

const GuesserView = () => (
    <div>
        <h3>Active Game</h3>
        <h4>You are guessing</h4>
        <input placeholder='Ask a question...' type='text'></input>
        <button>Ask</button>
    </div>
);

export default GuesserView;