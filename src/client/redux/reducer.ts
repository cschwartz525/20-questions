import { Action } from './actions';
import { selectIsPlayerInGroup } from './selectors';
import type { State } from './state';
import events from '../../global/events';

const gameCreatedReducer = (state: State, action: Action): State =>  {
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

const gameStartedReducer = (state: State, action: Action): State =>  {
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

const gameStateAcknowledgedReducer = (state: State, action: Action): State => {
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

const guessValidatedReducer = (state: State, action: Action): State => {
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

const playerJoinedReducer = (state: State, action: Action): State => {
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

const playerLeftReducer = (state: State, action: Action): State => {
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

const questionAnsweredReducer = (state: State, action: Action): State => {
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

const questionAskedReducer = (state: State, action: Action): State => {
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

const reducer = (state: State, action: Action): State =>  {
    switch (action.type) {

    case events.GAME_CREATED:
        return gameCreatedReducer(state, action);

    case events.GAME_STARTED:
        return gameStartedReducer(state, action);

    case events.GAME_STATE_ACKNOWLEDGED:
        return gameStateAcknowledgedReducer(state, action);

    case events.GUESS_VALIDATED:
        return guessValidatedReducer(state, action);

    case events.PLAYER_JOINED:
        return playerJoinedReducer(state, action);

    case events.PLAYER_LEFT:
        return playerLeftReducer(state, action);

    case events.QUESTION_ASKED:
        return questionAskedReducer(state, action);

    case events.QUESTION_ANSWERED:
        return questionAnsweredReducer(state, action);

    default:
        return state;

    }
};

export default reducer;