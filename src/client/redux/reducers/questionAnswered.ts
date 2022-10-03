import { Action } from '../actions';
import { State } from '../state';

export default (state: State, action: Action): State => {
    if (!action.payload?.gameId || action.payload.gameId !== state.game?.id) {
        return state;
    }

    const { answeredQuestions } = action.payload;

    return {
        ...state,
        game: {
            ...state.game,
            answeredQuestions,
            currentQuestion: ''
        }
    };
};