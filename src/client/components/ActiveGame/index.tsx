import React from 'react';
import { useSelector } from 'react-redux';
import ParticipantView from './ParticipantView';
import GuesserView from './GuesserView';
import { selectGuesser, selectMe } from '../../redux/selectors';

const ActiveGame = () => {
    const guesser = useSelector(selectGuesser);
    const me = useSelector(selectMe);

    if (!guesser) {
        return <></>;
    }

    const isGuesser = guesser.id === me.id;

    if (isGuesser) {
        return <GuesserView />;
    } else {
        return <ParticipantView />;
    }
};

export default ActiveGame;