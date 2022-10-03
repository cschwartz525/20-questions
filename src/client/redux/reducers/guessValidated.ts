import { Action } from '../actions';
import type { State } from '../state';

export default (state: State, action: Action): State => {
    if (!action.payload?.gameId || action.payload.gameId !== state.game?.id) {
        return state;
    }

    const { game, guess, isGuesser } = action.payload;

    const guesser = state.game.players.find(player => player.id === game.guesserId);
    const time = game.endTime - game.startTime;

    const results = [];

    results.push(`${guess} is ${game?.isWin ? 'correct' : 'incorrect'}`);
    results.push(game?.isWin
        ? (isGuesser ? 'You won the game!' : `${guesser?.name} won the game!`)
        : (isGuesser ? 'You lost the game!' : `${guesser?.name} lost the game!`)
    );
    results.push(`Total Time: ${time / 1000} seconds`);

    return {
        ...state,
        game: {
            ...state.game,
            isEnded: true,
            isInProgress: false,
            results
        }
    };
};