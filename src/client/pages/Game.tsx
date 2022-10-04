import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ActiveGame from '../components/ActiveGame';
import JoinGameForm from '../components/JoinGameForm';
import MobileToggle from '../components/MobileToggle';
import PlayersList from '../components/PlayersList';
import Title from '../components/Title';
import events from '../../global/events';
import { selectGame, selectGuesser } from '../redux/selectors';

const GamePage = () => {
    const { gameId } = useParams();
    const [initialized, setInitialized] = useState(false);
    const [joined, setJoined] = useState(false);

    const {
        isEnded = false,
        isInProgress = false,
        players = [],
        results = []
    } = useSelector(selectGame) || {};
    const guesser = useSelector(selectGuesser);

    const dispatch = useDispatch();

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
                        <JoinGameForm
                            gameId={gameId}
                            setJoined={setJoined}
                        />
                    }
                </div>
                <PlayersList
                    guesser={guesser}
                    players={players}
                />
            </div>
        </div>
    );
};

export default GamePage;