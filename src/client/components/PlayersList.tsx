import React from 'react';

const PlayersList = ({ players }) => {
    return (
        <div className='players-list'>
            <h3>Players</h3>
            <ul>
                {
                    players.length
                        ? players.map(({ id, isMe, name }) => {
                            const displayName = isMe ? `${name} (me)` : name;

                            return <li key={id}>{displayName}</li>;
                        })
                        : <li>No players</li>
                }
                {}
            </ul>
        </div>
    );
};

export default PlayersList;