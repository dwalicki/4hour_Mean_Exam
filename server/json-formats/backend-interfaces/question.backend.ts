import { IAnswer } from './answer.backend';

// base implementation of IQuestion //

export interface IQuestion {
    content: string,
    details: string,
    answers: Array<IAnswer>
}

// base question class that implements IQuestion

export class Question implements IQuestion{
    content: string;
    details: string;
    answers: IAnswer[];
}