export type Game = {
    answer?: string;
    answeredQuestions?: Question[];
    currentQuestion?: string;
    endTime?: number;
    guesserId?: string;
    id: string;
    isEnded?: boolean;
    isInProgress?: boolean;
    isWin?: boolean;
    players: Player[];
    startTime?: number;
    results?: string[];
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