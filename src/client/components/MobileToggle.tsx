import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPuzzlePiece, faUsers } from '@fortawesome/free-solid-svg-icons'

type GamePageProps = {
    toggleView: (view: string) => void;
};

const MobileToggle = ({ toggleView }: GamePageProps) => {
    return (
        <div className='mobile-toggle'>
            <button onClick={() => toggleView('game')}>
                <FontAwesomeIcon icon={faPuzzlePiece} /> Game
            </button>
            <button onClick={() => toggleView('players')}>
                <FontAwesomeIcon icon={faUsers} /> Players
            </button>
        </div>
    );
};

export default MobileToggle;