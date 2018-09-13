import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ServerMessage } from './../../classes/server-message';
import { IServerMessage } from './../../interfaces/server-message';
import { IUser } from './../../interfaces/user';
import { User } from '../../classes/user';

import * as uriBuilder from 'build-url';
import { BehaviorSubject } from 'Rxjs';
import { IQuestion } from '../../interfaces/question';
import { IAnswer } from '../../interfaces/answer';

@Injectable()

export class AnswerQuestionService {

  questions: BehaviorSubject<Array<IQuestion>>

  /**
   * @param _http injectable
   */
  constructor(private _http: HttpClient){
    this.questions = new BehaviorSubject([])
  }


/**
 * builds a uri based on the current classes requests
 * @param query uri query location on local hostname
 * @returns {string} uri location
 */
private _localAPIBuild(query: string): string {
  return uriBuilder('', {
    path: `api/${query}`
  });
}

addQuestion(question: IQuestion, callback: (response: IServerMessage<IQuestion>) => void): void {
  const uri = this._localAPIBuild('add-question');
  this._http.post(uri, question).subscribe((response: IServerMessage<IQuestion>) => {
    const temp = this.questions.getValue();
    if (response.success) {
      temp.push(response.output);
    }
    this.questions.next(temp);
    callback(response);
  });
}

addAnswer(answer: IAnswer, id: string, callback: (response: IServerMessage<IAnswer>) => void): void {
  const uri = this._localAPIBuild(`add-answer/${id}`);
  this._http.post(uri, answer).subscribe((response: IServerMessage<IAnswer>) => {
    callback(response);
  });
}

getQuestions(callback: (response: IServerMessage<Array<IQuestion>>) => void): void {
  const uri = this._localAPIBuild('get-questions');
  this._http.get(uri).subscribe((questions: IServerMessage<Array<IQuestion>>) => {
    if (questions.success) {
      this.questions.next(questions.output);
    } else {
      console.log(questions);
    }
    callback(questions);
  });
}

getQuestion(id: string, callback: (response: IServerMessage<IQuestion>) => void): void {
  const uri = this._localAPIBuild(`get-question/${id}`);
  this._http.get(uri).subscribe((response: IServerMessage<IQuestion>) => {
    callback(response);
  });
}

addLike(id: string, callback: (res: IServerMessage<IAnswer>) => void): void {
  this._http.get(`/api/add-like/${id}`).subscribe((res: IServerMessage<IAnswer>) => {
    callback(res);
  });
}
}