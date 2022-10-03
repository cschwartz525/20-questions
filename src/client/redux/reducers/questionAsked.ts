import { Action } from '../actions';
import type { State } from '../state';

export default (state: State, action: Action): State => {
    if (!action.payload?.gameId || action.payload.gameId !== state.game?.id) {
        return state;
    }

    const { question } = action.payload;

    return {
        ...state,
        game: {
            ...state.game,
            currentQuestion: question
        }
    };
};