import React from 'react';

const PlayersList = ({ players }) => {
    return (
        <div>
            <ul>
                {players.map(({ id, name }) => <li key={id}>{name}</li>)}
            </ul>
        </div>
    );
};

export default PlayersList;