import { Action } from '../actions';
import type { State } from '../state';

export default (state: State, action: Action): State => {
    if (!action.payload?.id) {
        return state;
    }

    const { answer, answeredQuestions, endTime, guesserId, id, players = [], startTime } = action.payload;
    const currentTime = Date.now();
    const isInProgress = !endTime && currentTime > startTime;

    return {
        ...state,
        game: {
            ...state.game,
            answer,
            answeredQuestions,
            endTime,
            guesserId,
            id,
            isInProgress,
            players,
            startTime
        }
    };
};