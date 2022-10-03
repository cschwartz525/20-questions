import { Action } from '../actions';
import { selectIsPlayerInGroup } from '../selectors';
import type { State } from '../state';

export default (state: State, action: Action): State => {
    if (!action.payload?.gameId || action.payload.gameId !== state.game?.id) {
        return state;
    }

    const { player } = action.payload;
    const playerInGroup = selectIsPlayerInGroup(state, player);

    if (!playerInGroup) {
        return state;
    }

    const newPlayers = state.game.players.filter(({ id }) => id !== player.id);

    return {
        ...state,
        game: {
            ...state.game,
            players: newPlayers
        }
    };
};