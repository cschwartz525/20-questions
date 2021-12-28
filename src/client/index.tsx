import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';

import LandingPage from './pages/Landing';

const App = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('ws://localhost:3000');

        newSocket.open();

        setSocket(newSocket);

        return () => { newSocket.close() };
    }, [setSocket]);
    
    return (
        <LandingPage socket={socket} />
    );
};

render(
    <App />,
    document.getElementById('root')
);