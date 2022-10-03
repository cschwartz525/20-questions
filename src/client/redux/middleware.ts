import { Dispatch } from 'react';
import { Middleware, MiddlewareAPI } from 'redux';
import { Socket } from 'socket.io';
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

/**
 * Initialize socket listeners if they have not already been initialized
 *
 * @param socket {Socket} socket.io connection
 * @param dispatch {Dispatch<Action>} method used to dispatch redux actions
 */
const initializeListeners = (socket: Socket, dispatch: Dispatch<Action>): void => {
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
};

/**
 * Emit socket messages when certain actions are dispatched
 *
 * @param socket {Socket} socket.io connection
 * @param action {Action} the action that the middleware intercepted
 */
const handleEmitSocketMessages = (socket: Socket, action: Action) => {
    if (action.type === events.ANSWER_QUESTION) {
        socket.emit(events.ANSWER_QUESTION, action.payload);
    } else if (action.type === events.ASK_QUESTION) {
        socket.emit(events.ASK_QUESTION, action.payload);
    } else if (action.type === events.CREATE_GAME) {
        socket.emit(events.CREATE_GAME);
    } else if (action.type === events.JOIN_GAME) {
        socket.emit(events.JOIN_GAME, action.payload);
    } else if (action.type === events.REQUEST_GAME_STATE) {
        socket.emit(events.REQUEST_GAME_STATE, { gameId: action.payload.gameId });
    } else if (action.type === events.RESTART_GAME) {
        socket.emit(events.RESTART_GAME, { gameId: action.payload.gameId });
    } else if (action.type === events.START_GAME) {
        socket.emit(events.START_GAME, { gameId: action.payload.gameId });
    } else if (action.type === events.SUBMIT_GUESS) {
        socket.emit(events.SUBMIT_GUESS, action.payload);
    }
}

export const socketMiddleware: Middleware = (
    store: MiddlewareAPI
) => (
    next: Dispatch<Action>
) => (
    action: Action
) => {
    const { dispatch } = store;
    const socket = getSocket();

    initializeListeners(socket, dispatch);

    handleEmitSocketMessages(socket, action);

    return next(action);
};