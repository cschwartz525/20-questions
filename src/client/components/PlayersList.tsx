import React from 'react';
import PlayersListItem from './PlayersListItem';
import { Player } from '../../global/types';

type PlayersListProps = {
    guesser?: Player;
    players: Player[];
};

const PlayersList = ({ guesser, players }: PlayersListProps) => {
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