import React from 'react';
import { Player } from '../../global/types';

type PlayersListProps = {
    isGuesser: boolean;
    player: Player;
};

const PlayersListItem = ({ isGuesser, player }: PlayersListProps) => {
    const { isMe, name } = player;
    const className = isGuesser ? 'guesser' : '';
    const displayName = isMe ? `${name} (me)` : name;

    return <li className={className}>{displayName}</li>;
};

export default PlayersListItem;