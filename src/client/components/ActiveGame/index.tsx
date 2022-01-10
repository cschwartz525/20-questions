import React from 'react';
import ParticipantView from './ParticipantView';
import { Player } from '../../../global/types';
import GuesserView from './GuesserView';

type ActiveGameProps = {
    answer?: string;
    guesser: Player;
    playerId?: string;
};

const ActiveGame = ({ answer, guesser, playerId }: ActiveGameProps) => {
    if (!guesser) {
        return <></>;
    }

    const isGuesser = guesser.id === playerId;

    if (isGuesser) {
        return <GuesserView />;
    } else {
        return <ParticipantView answer={answer} guesser={guesser} />;
    }
};

export default ActiveGame;