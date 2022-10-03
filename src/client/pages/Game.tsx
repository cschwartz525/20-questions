import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Socket } from 'socket.io-client';
import ActiveGame from '../components/ActiveGame';
import JoinGameForm from '../components/JoinGameForm';
import MobileToggle from '../components/MobileToggle';
import PlayersList from '../components/PlayersList';
import Title from '../components/Title';
import events from '../../global/events';
import { selectGame, selectGuesser, selectMe } from '../redux/selectors';

type GamePageProps = {
    socket: Socket;
};

const GamePage = ({ socket }: GamePageProps) => {
    const { gameId } = useParams();
    const [initialized, setInitialized] = useState(false);
    const [joined, setJoined] = useState(false);

    const {
        answer,
        answeredQuestions,
        currentQuestion = '',
        isEnded = false,
        isInProgress = false,
        players = [],
        results = []
    } = useSelector(selectGame) || {};
    const me = useSelector(selectMe);
    const guesser = useSelector(selectGuesser);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!initialized) {
            dispatch({ type: 'REQUEST_GAME_STATE', payload: { gameId } });
            setInitialized(true);
        }
    }, [
        dispatch,
        gameId,
        initialized,
        setInitialized
    ]);

    const startGame = () => {
        if (socket) {
            socket.emit(events.START_GAME, { gameId });
        }
    };

    const restartGame = () => {
        if (socket) {
            socket.emit(events.RESTART_GAME, { gameId });
        }
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
                        <ActiveGame
                            answer={answer}
                            answeredQuestions={answeredQuestions}
                            currentQuestion={currentQuestion}
                            gameId={gameId}
                            guesser={guesser}
                            playerId={me?.id}
                            socket={socket}
                        />
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
                            socket={socket}
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