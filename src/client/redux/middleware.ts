import { Dispatch } from 'react';
import { Action, Middleware, MiddlewareAPI } from 'redux';

export const socketMiddleware: Middleware = (
    store: MiddlewareAPI
) => (
    next: Dispatch<Action>
) => (
    action: Action
) => {
    const { dispatch, getState } = store;
    const state = getState();

    console.log('ACTION', action);
    console.log('STATE', state);

    return next(action);
};