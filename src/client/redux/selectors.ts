import { State } from './state';
import { Player } from '../../global/types';

export const selectGame = (state: State) => {
    return state.game;
}

export const selectGuesser = (state: State) => {
    const guesserId = state.game?.guesserId || '';
    const players = selectPlayers(state);

    return players.find(({ id }) => id === guesserId);
}

export const selectMe = (state: State) => {
    const players = selectPlayers(state);

    return players.find(player => player.isMe);
}

export const selectIsPlayerInGroup = (state: State, player: Player) => {
    const players = selectPlayers(state);

    const isPlayerInGroup = players.filter(({ id }) => id === player.id).length > 0;

    console.log('craig', isPlayerInGroup);

    return isPlayerInGroup;
}

export const selectPlayers = (state: State) => {
    return state.game?.players || [];
}