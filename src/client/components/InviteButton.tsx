import React, { useState } from 'react';

const InviteButton = () => {
    const [showNotification, setShowNotification] = useState(false);

    const copyGameLink = async () => {
        const gameUrl = window.location.href;
        try {
            await navigator.clipboard.writeText(gameUrl);
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 2000);
        } catch (err) {
            console.error('Failed to copy game link:', err);
        }
    };

    return (
        <div className="invite-button-container">
            <button onClick={copyGameLink}>Invite Players</button>
            {showNotification && (
                <div className="notification">
                    Game link copied to clipboard!
                </div>
            )}
        </div>
    );
};

export default InviteButton; 