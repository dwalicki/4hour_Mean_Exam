import { IAnswer } from './answer';

export interface IQuestion {
    _id: string;
    content: string;
    details: string;
    answers: Array<IAnswer>;
    message?: string;
}