export type Game = {
    answer?: string;
    currentQuestion?: string;
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