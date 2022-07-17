export type Game = {
    answer?: string;
    answeredQuestions?: Question[];
    currentQuestion?: string;
    endTime?: number;
    guesserId?: string;
    id: string;
    isWin?: boolean;
    players: Player[];
    startTime?: number;
};

export type Player = {
    id: string;
    isMe?: boolean;
    name: string;
};

export type Question = {
    question: string;
    answer: string;
};