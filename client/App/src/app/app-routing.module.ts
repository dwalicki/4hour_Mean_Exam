// MODULES
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { LogRegComponent } from './components/log-reg/log-reg.component';
import { LoginComponent } from './components/log-reg/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuestionComponent } from './components/question/question.component';
import { AnswerComponent } from './components/answer/answer.component';
import { ShowAnswersComponent } from './components/show-answers/show-answers.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LogRegComponent,
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path: 'new-question',
    pathMatch: 'full',
    component: QuestionComponent
  },
  {
    path: 'new-answer/:question_id',
    pathMatch: 'full',
    component: AnswerComponent
  },
  {
    path: 'question/:question_id',
    pathMatch: 'full',
    component: ShowAnswersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
