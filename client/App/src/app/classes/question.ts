import { IQuestion } from '../interfaces/question';
import { IAnswer } from '../interfaces/answer';

export class Question implements IQuestion {
    _id: string;
    message?: string;
    content: string;
    details: string;
    answers: IAnswer[];
}