import { Component, OnInit } from '@angular/core';
import { AnswerQuestionService } from '../../services/answer-question/answer-question.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { IAnswer } from '../../interfaces/answer';
import { IQuestion } from '../../interfaces/question';
import { Answer } from '../../classes/answer';
import { Question } from '../../classes/question';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  answer: IAnswer;
  question: IQuestion;
  questionID: string;
  constructor(private _ansQues: AnswerQuestionService,
    private _router: Router, private _actRoute: ActivatedRoute,
    private _userService: UserService) {
    this.answer = new Answer();
    this.question = new Question();
  }

  ngOnInit() {
    this._userService.ensureUserIsLoggedIn((res) => {
      if (!res.success) {
        this._router.navigateByUrl('');
      }
    });
    this._actRoute.paramMap.subscribe((params) => {
      this.questionID = params.get('question_id');
      this._ansQues.getQuestion(this.questionID, (response) => {
        if (response.success) {
          this.question = response.output;
        }
        console.log('from init' + this.questionID);
      });
    });
  }

  toHome() {
    this._router.navigateByUrl('/dashboard');
  }

  addAnswer() {
    this._ansQues.addAnswer(this.answer, this.questionID, (response) => {
      if (response.success) {
        console.log('added');
        this._router.navigateByUrl('');
      } else {
        console.log(response);
      }
    });
  }

  logout() {

    this._userService.logoutUser((response) => {
      this._router.navigate(['']);
    });
  }
}
