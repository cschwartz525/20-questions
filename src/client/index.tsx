import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import './style/index.scss';

import Game from './pages/Game';
import Lobby from './pages/Lobby';

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Lobby />} />
                <Route path='/game/:gameId' element={<Game />} />
            </Routes>
        </BrowserRouter>
    </Provider>
);

render(
    <App />,
    document.getElementById('root')
);