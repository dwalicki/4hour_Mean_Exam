import { IUser } from './user.backend';
import { IQuestion } from './question.backend';

// base implementation of IUser //

export interface IAnswer {
    content: string,
    details: string,
    poster: IUser,
    question: IQuestion;
    likes: number;
}

// base answer class that implements IAnswer

export class Answer implements IAnswer {
    content: string;
    details: string;
    poster: IUser;
    question: IQuestion;
    likes: number;
}