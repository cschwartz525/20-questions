import { Action } from '../actions';
import type { State } from '../state';

export default (state: State, action: Action): State =>  {
    if (!action.payload?.gameId) {
        return state;
    }

    const { gameId } = action.payload;

    return {
        ...state,
        game: {
            ...state.game,
            id: gameId,
            isEnded: false,
            isInProgress: false,
            players: []
        }
    };
};