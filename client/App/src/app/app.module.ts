// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/log-reg/login/login.component';
import { LogRegComponent } from './components/log-reg/log-reg.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Providers
import { UserService } from './services/user/user.service';
import { QuestionComponent } from './components/question/question.component';
import { AnswerComponent } from './components/answer/answer.component';
import { ShowAnswersComponent } from './components/show-answers/show-answers.component';
import { AnswerQuestionService } from './services/answer-question/answer-question.service';

@NgModule({
  declarations: [
    AppComponent,
    AnswerComponent,
    DashboardComponent,
    LogRegComponent,
    QuestionComponent,
    ShowAnswersComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService, AnswerQuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
