import { IAnswer } from '../interfaces/answer';
import { IUser } from '../interfaces/user';
import { IQuestion } from '../interfaces/question';

export class Answer implements IAnswer {
    _id: string;
    message?: string;
    content: string;
    details: string;
    poster: IUser;
    question: IQuestion;
    likes: number;
}