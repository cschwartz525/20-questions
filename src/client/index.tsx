import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import store from './redux/store';
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
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Lobby socket={socket} />} />
                    <Route path='/game/:gameId' element={<Game socket={socket} />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

render(
    <App />,
    document.getElementById('root')
);