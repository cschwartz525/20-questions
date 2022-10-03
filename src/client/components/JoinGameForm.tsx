import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import events from '../../global/events';

type JoinGameFormProps = {
    gameId: string;
    setJoined: (joined: boolean) => void;
};

const JoinGameForm = ({ gameId, setJoined }: JoinGameFormProps) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const onNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
    };

    const joinGame = (): void => {
        dispatch({ type: events.JOIN_GAME, payload: { gameId, name } })
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