export type Game = {
    endTime?: number;
    guesserId?: string;
    id: string;
    players: Player[];
    startTime?: number;
};

export type Player = {
    id: string;
    isMe?: boolean;
    name: string;
};