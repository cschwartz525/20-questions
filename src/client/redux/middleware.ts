import { Dispatch } from 'react';
import { Middleware, MiddlewareAPI } from 'redux';
import io from 'socket.io-client';
import { Action } from './actions';
import events from '../../global/events';

let socket;

const getSocket = () => {
    if (!socket) {
        socket = io();

        socket.open();
    }

    return socket;
}

export const socketMiddleware: Middleware = (
    store: MiddlewareAPI
) => (
    next: Dispatch<Action>
) => (
    action: Action
) => {
    const { dispatch, getState } = store;
    const state = getState();
    const socket = getSocket();

    console.log('ACTION', action);
    console.log('STATE', state);
    console.log('SOCKET', socket);

    socket.on('GAME_STARTED', (data) => {
        dispatch({ type: 'GAME_STARTED', payload: data });
    });

    socket.on('GAME_STATE_ACKNOWLEDGED', (data) => {
        dispatch({ type: 'GAME_STATE_ACKNOWLEDGED', payload: data });
    });

    socket.on('GUESS_VALIDATED', (data) => {
        dispatch({ type: 'GUESS_VALIDATED', payload: data });
    });

    socket.on('PLAYER_JOINED', (data) => {
        dispatch({ type: 'PLAYER_JOINED', payload: data });
    });

    socket.on('PLAYER_LEFT', (data) => {
        dispatch({ type: 'PLAYER_LEFT', payload: data });
    });

    socket.on('QUESTION_ASKED', (data) => {
        dispatch({ type: 'QUESTION_ASKED', payload: data });
    });

    socket.on('QUESTION_ANSWERED', (data) => {
        dispatch({ type: 'QUESTION_ANSWERED', payload: data });
    });

    if (action.type === 'REQUEST_GAME_STATE') {
        socket.emit(events.REQUEST_GAME_STATE, { gameId: action.payload.gameId });
    }

    return next(action);
};