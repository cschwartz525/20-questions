import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { socketMiddleware } from './middleware';
import reducers from './reducers';
import initialState from './state';

const middlewares = [socketMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);

export default createStore(reducers, initialState, composedEnhancers);