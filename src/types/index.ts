export interface IChoice {
    id: number;
    value: string;
}

export interface IQuestion {
    id: number;
    question: string;
    choices: IChoice[];
    answer: string;
}

export interface IQuiz {
    title: string;
    description: string;
    questions: IQuestion[];
}
