import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import './style/index.scss';

import Game from './pages/Game';
import Lobby from './pages/Lobby';

const App = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io();

        newSocket.open();

        setSocket(newSocket);

        return () => { newSocket.close() };
    }, [setSocket]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Lobby socket={socket} />} />
                <Route path='/game/:gameId' element={<Game socket={socket} />} />
            </Routes>
        </BrowserRouter>
    );
};

render(
    <App />,
    document.getElementById('root')
);