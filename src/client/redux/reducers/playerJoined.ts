import { Action } from '../actions';
import { selectIsPlayerInGroup } from '../selectors';
import type { State } from '../state';

export default (state: State, action: Action): State => {
    if (!action.payload?.gameId || action.payload.gameId !== state.game?.id) {
        return state;
    }

    const { player } = action.payload;
    const playerAlreadyInGroup = selectIsPlayerInGroup(state, player);

    if (playerAlreadyInGroup) {
        return state;
    }

    return {
        ...state,
        game: {
            ...state.game,
            players: [
                ...state.game.players,
                player
            ]
        }
    };
};