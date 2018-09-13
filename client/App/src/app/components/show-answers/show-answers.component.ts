import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AnswerQuestionService } from '../../services/answer-question/answer-question.service';
import { IQuestion } from '../../interfaces/question';
import { Question } from '../../classes/question';
import { UserService } from '../../services/user/user.service';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';

@Component({
  selector: 'app-show-answers',
  templateUrl: './show-answers.component.html',
  styleUrls: ['./show-answers.component.css']
})
export class ShowAnswersComponent implements OnInit {

  question: IQuestion;
  constructor(private _router: Router, private _actRouter: ActivatedRoute,
    private _quesAns: AnswerQuestionService,
    private _userService: UserService) {
    this.question = new Question();
  }

  ngOnInit() {
    this._userService.ensureUserIsLoggedIn((res) => {
      if (!res.success) {
        this._router.navigateByUrl('');
      }
    });
    this._actRouter.paramMap.subscribe((params) => {
      const id = params.get('question_id');
      this._quesAns.getQuestion(id, (res) => {
        this.question = res.output;
        console.log(res);
      });
    });
  }

  toHome() {
    this._router.navigate(['dashboard']);
  }

  logout() {

    this._userService.logoutUser((response) => {
      this._router.navigate(['']);
    });
  }

  atAnswer() {
    this._actRouter.paramMap.subscribe((params) => {
      const id = params.get('question_id');
      this._router.navigateByUrl(`/new-answer/${id}`);
    });
  }

  addLike(id: string) {
    this._quesAns.addLike(id, (res) => {
      if (res.success) {
        this._actRouter.paramMap.subscribe((params) => {
          id = params.get('question_id');
          this._quesAns.getQuestion(id, (data) => {
            console.log(data, id);
            this.question = data.output;
          });
        });
      }
    });
  }
}
