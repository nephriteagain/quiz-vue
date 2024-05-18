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

export type QuizListDto = {
    _id: string;
    title: string;
    createdBy: string;
    votes: string;
};

export type QuestionsDto = {
    questionText: string;
    options: string[];
    correctAnswer: string;
};

export type QuizItemDto = {
    _id: string;
    title: string;
    createdBy: string;
    createdAt: string;
    authorId: string;
    questions: QuestionsDto[];
};

export type UserQuizAnswer = {
    questionText: string;
    correctAnswer: string;
};

export type QuestionResultDto = QuestionsDto & {
    userAnswer: string;
    userCorrect: boolean;
};
