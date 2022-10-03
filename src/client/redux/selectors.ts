import { State } from './state';
import { Game, Player } from '../../global/types';

export const selectGame = (state: State): Game => {
    return state.game;
}

export const selectGameId = (state: State): string => {
    return selectGame(state)?.id;
}

export const selectGuesser = (state: State): Player => {
    const guesserId = state.game?.guesserId || '';
    const players = selectPlayers(state);

    return players.find(({ id }) => id === guesserId);
}

export const selectMe = (state: State): Player => {
    const players = selectPlayers(state);

    return players.find(player => player.isMe);
}

export const selectIsPlayerInGroup = (state: State, player: Player): boolean => {
    const players = selectPlayers(state);

    const isPlayerInGroup = players.filter(({ id }) => id === player.id).length > 0;

    return isPlayerInGroup;
}

export const selectPlayers = (state: State): Player[] => {
    return state.game?.players || [];
}