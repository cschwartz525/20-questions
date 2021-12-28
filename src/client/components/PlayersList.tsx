import React from 'react';

const PlayersList = ({ players }) => {
    return (
        <div>
            <ul>
                {players.map(({ name }) => <li>{name}</li>)}
            </ul>
        </div>
    );
};

export default PlayersList;