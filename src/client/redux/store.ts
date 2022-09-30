import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { socketMiddleware } from './middleware';
import reducer from './reducer';
import initialState from './state';

const middlewares = [socketMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);

// TODO: Add code to only load redux devtools in non-prod envs
const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers)

export default createStore(reducer, initialState, composedEnhancers);