import React from 'react';
import { Socket } from 'socket.io-client';
import ParticipantView from './ParticipantView';
import GuesserView from './GuesserView';
import { Player, Question } from '../../../global/types';

type ActiveGameProps = {
    answer?: string;
    answeredQuestions?: Question[];
    currentQuestion?: string;
    gameId: string;
    guesser: Player;
    playerId?: string;
    socket: Socket;
};

const ActiveGame = ({
    answer,
    answeredQuestions,
    currentQuestion,
    gameId,
    guesser,
    playerId,
    socket
}: ActiveGameProps) => {
    if (!guesser) {
        return <></>;
    }

    const isGuesser = guesser.id === playerId;

    if (isGuesser) {
        return <GuesserView
            answeredQuestions={answeredQuestions}
            currentQuestion={currentQuestion}
            gameId={gameId}
            socket={socket}
        />;
    } else {
        return <ParticipantView
            answer={answer}
            answeredQuestions={answeredQuestions}
            currentQuestion={currentQuestion}
            gameId={gameId}
            guesser={guesser}
            socket={socket}
        />;
    }
};

export default ActiveGame;