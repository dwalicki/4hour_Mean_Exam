import { Component, OnInit } from '@angular/core';
import { AnswerQuestionService } from '../../services/answer-question/answer-question.service';
import { IQuestion } from '../../interfaces/question';
import { Question } from '../../classes/question';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  question: IQuestion;
  constructor(private _ansQues: AnswerQuestionService, private _router: Router, private _userService: UserService) {
    this.question = new Question();
  }

  ngOnInit() {
    this._userService.ensureUserIsLoggedIn((res) => {
      if (!res.success) {
        this._router.navigateByUrl('');
      }
    });
  }

  toHome() {
    this._router.navigate(['dashboard']);
  }
  
  addQuestion() {
    this._ansQues.addQuestion(this.question, (response) => {
      if (response.success) {
        this.toHome();
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
