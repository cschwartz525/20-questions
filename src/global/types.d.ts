export type Game = {
    endTime?: number;
    players: Player[];
    startTime?: number;
};

export type Player = {
    id: string;
    name: string;
};