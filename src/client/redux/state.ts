import { Game } from '../../global/types';

export type State = {
    game?: Game
};

const state: State = {
    game: null
};

export default state;