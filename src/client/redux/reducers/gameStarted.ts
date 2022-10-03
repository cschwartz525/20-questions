import { Action } from '../actions';
import type { State } from '../state';

export default (state: State, action: Action): State =>  {
    if (!action.payload?.id || action.payload.id !== state.game?.id) {
        return state;
    }

    const { answer, answeredQuestions, guesserId, startTime } = action.payload;

    return {
        ...state,
        game: {
            ...state.game,
            answer,
            answeredQuestions,
            guesserId,
            isEnded: false,
            isInProgress: true,
            startTime,
            results: []
        }
    };
};