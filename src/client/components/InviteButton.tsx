import React, { useState } from 'react';
import Toast from './Toast';

const InviteButton = () => {
    const [showNotification, setShowNotification] = useState(false);

    const copyGameLink = async () => {
        const gameUrl = window.location.href;
        try {
            await navigator.clipboard.writeText(gameUrl);
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        } catch (err) {
            console.error('Failed to copy game link:', err);
        }
    };

    return (
        <>
            <button onClick={copyGameLink}>Invite Players</button>
            {showNotification && <Toast message="Game link copied to clipboard!" />}
        </>
    );
};

export default InviteButton; 