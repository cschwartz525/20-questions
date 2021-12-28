import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';

import Game from './pages/Game';
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
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage socket={socket} />} />
                <Route path='/game/:gameId' element={<Game />} />
            </Routes>
        </BrowserRouter>
    );
};

render(
    <App />,
    document.getElementById('root')
);