import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ActiveGame from '../components/ActiveGame';
import JoinGameForm from '../components/JoinGameForm';
import MobileToggle from '../components/MobileToggle';
import PlayersList from '../components/PlayersList';
import Title from '../components/Title';
import { selectGame, selectMe } from '../redux/selectors';
import events from '../../global/events';

const GamePage = () => {
    const dispatch = useDispatch();
    const { gameId } = useParams();
    const [initialized, setInitialized] = useState(false);
    const {
        isEnded = false,
        isInProgress = false,
        results = []
    } = useSelector(selectGame) || {};
    const joined = !!useSelector(selectMe);

    useEffect(() => {
        if (!initialized) {
            dispatch({ type: events.REQUEST_GAME_STATE, payload: { gameId } });
            setInitialized(true);
        }
    }, [
        dispatch,
        gameId,
        initialized,
        setInitialized
    ]);

    const startGame = () => {
        dispatch({ type: events.START_GAME, payload: { gameId } })
    };

    const restartGame = () => {
        dispatch({ type: events.RESTART_GAME, payload: { gameId } })
    };

    const toggleView = (view: string) => {
        if (view === 'game') {
            document.getElementById('game').classList.add('visible-mobile');
            document.getElementById('players').classList.remove('visible-mobile');
        } else {
            document.getElementById('players').classList.add('visible-mobile');
            document.getElementById('game').classList.remove('visible-mobile');
        }
    };

    return (
        <div id='main'>
            <Title />
            <MobileToggle toggleView={toggleView} />
            <div id='game-container'>
                <div id='game' className='visible-mobile'>
                    {
                        joined &&
                        isInProgress &&
                        <ActiveGame />
                    }
                    {
                        joined &&
                        !isInProgress &&
                        !isEnded &&
                        <button onClick={startGame}>Start Game</button>
                    }
                    {
                        joined &&
                        !isInProgress &&
                        isEnded &&
                        <div>
                            {results.map((line, index) => <p key={`line_${index}`}>{line}</p>)}
                            <button onClick={restartGame}>Play Again?</button>
                        </div>
                    }
                    {
                        !joined &&
                        isInProgress &&
                        <h3>Game is in progress...</h3>
                    }
                    {
                        !joined &&
                        <JoinGameForm />
                    }
                </div>
                <PlayersList />
            </div>
        </div>
    );
};

export default GamePage;