import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameId } from '../redux/selectors';
import events from '../../global/events';

const JoinGameForm = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const gameId = useSelector(selectGameId);

    const onNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
    };

    const joinGame = (): void => {
        dispatch({ type: events.JOIN_GAME, payload: { gameId, name } })
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