import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import { selectGameId } from '../redux/selectors';

const LobbyPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const gameId = useSelector(selectGameId);

    useEffect(() => {
        if (gameId) {
            navigate(`/game/${gameId}`);
        }
    }, [gameId, navigate]);

    const createGame = (): void => {
        dispatch({ type: 'CREATE_GAME' });
    };

    return (
        <div id='lobby' className='text-centered'>
            <Title />
            <h2>The classic multiplayer guessing game</h2>
            <h3>Start New Game</h3>
            <button onClick={createGame}>Create Game</button>
            <h3>- OR -</h3>
            <h3>Join Existing Game</h3>
            <p>To join an ongoing game, enter the URL in the address bar</p>
        </div>
    );
};

export default LobbyPage;