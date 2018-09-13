import { IQuestion } from './question';
import { IUser } from './user';

export interface IAnswer {
    _id: string;
    content: string;
    details: string;
    poster: IUser;
    question: IQuestion;
    likes: number;
    message?: string;
}
