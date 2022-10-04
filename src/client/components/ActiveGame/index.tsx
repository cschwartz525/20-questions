import React from 'react';
import { useSelector } from 'react-redux';
import ParticipantView from './ParticipantView';
import GuesserView from './GuesserView';
import { selectGame, selectGuesser, selectMe } from '../../redux/selectors';

const ActiveGame = () => {
    const game = useSelector(selectGame);
    const guesser = useSelector(selectGuesser);
    const me = useSelector(selectMe);
    const { answer, answeredQuestions, currentQuestion, id: gameId } = game;

    if (!guesser) {
        return <></>;
    }

    const isGuesser = guesser.id === me.id;

    if (isGuesser) {
        return <GuesserView
            answeredQuestions={answeredQuestions}
            currentQuestion={currentQuestion}
            gameId={gameId}
        />;
    } else {
        return <ParticipantView
            answer={answer}
            answeredQuestions={answeredQuestions}
            currentQuestion={currentQuestion}
            gameId={gameId}
            guesser={guesser}
        />;
    }
};

export default ActiveGame;