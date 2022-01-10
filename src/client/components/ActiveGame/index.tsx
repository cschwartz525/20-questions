import React from 'react';
import ParticipantView from './ParticipantView';
import { Player } from '../../../global/types';
import GuesserView from './GuesserView';
import { Socket } from 'socket.io-client';

type ActiveGameProps = {
    answer?: string;
    currentQuestion?: string;
    gameId: string;
    guesser: Player;
    playerId?: string;
    socket: Socket;
};

const ActiveGame = ({
    answer,
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
            currentQuestion={currentQuestion}
            gameId={gameId}
            socket={socket}
        />;
    } else {
        return <ParticipantView
            answer={answer}
            currentQuestion={currentQuestion}
            guesser={guesser}
        />;
    }
};

export default ActiveGame;