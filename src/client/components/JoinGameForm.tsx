import React, { ChangeEvent, useState } from 'react';
import events from '../../global/events';

const JoinGameForm = ({ gameId, setJoined, socket }) => {
    const [name, setName] = useState('');

    const onNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
    };

    const joinGame = (): void => {
        socket.emit(events.JOIN_GAME, { gameId, name });
        setJoined(true);
    };

    return (
        <div>
            <input onChange={onNameChange} placeholder='Enter your name' type='text' value={name} />
            <button onClick={joinGame}>Join Game</button>
        </div>
    );
};

export default JoinGameForm;