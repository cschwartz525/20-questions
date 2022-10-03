import gameCreatedReducer from './gameCreated';
import gameStartedReducer from './gameStarted';
import gameStateAcknowledgedReducer from './gameStateAcknowledged';
import guessValidatedReducer from './guessValidated';
import playerJoinedReducer from './playerJoined';
import playerLeftReducer from './playerLeft';
import questionAnsweredReducer from './questionAnswered';
import questionAskedReducer from './questionAsked';
import { Action } from '../actions';
import type { State } from '../state';
import events from '../../../global/events';

const reducers = {
    [events.GAME_CREATED]: gameCreatedReducer,
    [events.GAME_STARTED]: gameStartedReducer,
    [events.GAME_STATE_ACKNOWLEDGED]: gameStateAcknowledgedReducer,
    [events.GUESS_VALIDATED]: guessValidatedReducer,
    [events.PLAYER_JOINED]: playerJoinedReducer,
    [events.PLAYER_LEFT]: playerLeftReducer,
    [events.QUESTION_ASKED]: questionAskedReducer,
    [events.QUESTION_ANSWERED]: questionAnsweredReducer
}

export default (state: State, action: Action): State =>  {
    if (reducers[action.type]) {
        return reducers[action.type](state, action);
    } else {
        return state;
    }
};