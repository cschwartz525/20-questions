import { Dispatch } from 'react';
import {  } from 'react-router';
import { Middleware, MiddlewareAPI } from 'redux';
import io from 'socket.io-client';
import { Action } from './actions';
import events from '../../global/events';

let initialized = false;
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

    // Initialize socket listeners if they have not already been initialized
    if (!initialized) {
        socket.on(events.GAME_CREATED, (data) => {
            dispatch({ type: events.GAME_CREATED, payload: data });
        });

        socket.on(events.GAME_STARTED, (data) => {
            dispatch({ type: events.GAME_STARTED, payload: data });
        });

        socket.on(events.GAME_STATE_ACKNOWLEDGED, (data) => {
            dispatch({ type: events.GAME_STATE_ACKNOWLEDGED, payload: data });
        });

        socket.on(events.GUESS_VALIDATED, (data) => {
            dispatch({ type: events.GUESS_VALIDATED, payload: data });
        });

        socket.on(events.PLAYER_JOINED, (data) => {
            dispatch({ type: events.PLAYER_JOINED, payload: data });
        });

        socket.on(events.PLAYER_LEFT, (data) => {
            dispatch({ type: events.PLAYER_LEFT, payload: data });
        });

        socket.on(events.QUESTION_ASKED, (data) => {
            dispatch({ type: events.QUESTION_ASKED, payload: data });
        });

        socket.on(events.QUESTION_ANSWERED, (data) => {
            dispatch({ type: events.QUESTION_ANSWERED, payload: data });
        });

        initialized = true;
    }

    // Emit socket messages when certain actions are dispatched
    if (action.type === events.CREATE_GAME) {
        socket.emit(events.CREATE_GAME);
    } else if (action.type === events.REQUEST_GAME_STATE) {
        socket.emit(events.REQUEST_GAME_STATE, { gameId: action.payload.gameId });
    } else if (action.type === events.RESTART_GAME) {
        socket.emit(events.RESTART_GAME, { gameId: action.payload.gameId });
    } else if (action.type === events.START_GAME) {
        socket.emit(events.START_GAME, { gameId: action.payload.gameId });
    }

    return next(action);
};