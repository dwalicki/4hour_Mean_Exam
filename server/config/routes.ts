
// Dependencies
import * as express from 'express';
import * as path from 'path';

// Controllers
import { LoginRegController } from './../controllers/login.controller';
import { QuestionAnswerController } from './../controllers/question-answer.controller';

// object routes contains the master route paths for the app
export const routes = (app: express.Express) => {

    // User Login and Registration Routes
    app.post('/api/register', (req, res) => LoginRegController.registerUser(req, res));
    app.get('/api/is-logged', (req, res) => LoginRegController.checkSessionFor(req, res, '_id'));
    app.get('/api/logout', (req, res) => LoginRegController.clearSessionFor(req, res, '_id'));


    // Question and Answer Routes
    app.post('/api/add-question', (req, res) => QuestionAnswerController.addQuestion(req, res));
    app.post('/api/add-answer/:id', (req, res) => QuestionAnswerController.addAnswer(req, res));
    app.get('/api/get-question/:id', (req, res) => QuestionAnswerController.getQuestionById(req, res));
    app.get('/api/get-answer/:id', (req, res) => QuestionAnswerController.getAnswerById(req, res));
    app.get('/api/get-questions', (req, res) => QuestionAnswerController.getQuestions(req, res));
    app.get('/api/add-like/:id', (req, res) => QuestionAnswerController.addLike(req, res));

    // Base route and serves frontend
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../../client/App/dist/App/index.html')));
};