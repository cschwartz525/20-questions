import React from 'react';
import { useSelector } from 'react-redux';
import PlayersListItem from './PlayersListItem';
import { selectGuesser, selectPlayers } from '../redux/selectors';

const PlayersList = () => {
    const guesser = useSelector(selectGuesser);
    const players = useSelector(selectPlayers);

    return (
        <div id='players'>
            <h3>Players</h3>
            <ul>
                {
                    players.length
                        ? players.map(player => (
                            <PlayersListItem
                                isGuesser={guesser?.id === player?.id}
                                key={player?.id}
                                player={player}
                            />
                        ))
                        : <li>No players</li>
                }
                {}
            </ul>
        </div>
    );
};

export default PlayersList;