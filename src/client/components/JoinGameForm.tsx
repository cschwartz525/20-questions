import React, { ChangeEvent, useState } from 'react';
import { Socket } from 'socket.io-client';
import events from '../../global/events';

type JoinGameFormProps = {
    gameId: string;
    setJoined: (joined: boolean) => void;
    socket: Socket;
};

const JoinGameForm = ({ gameId, setJoined, socket }: JoinGameFormProps) => {
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
            <input
                className='margin-bottom-small'
                onChange={onNameChange}
                placeholder='Enter your name'
                type='text'
                value={name}
            />
            <button onClick={joinGame}>Join Game</button>
        </div>
    );
};

export default JoinGameForm;