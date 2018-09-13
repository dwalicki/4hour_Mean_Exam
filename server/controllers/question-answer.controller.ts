
// DEPENDENCIES
import * as mongoose from 'mongoose';
import * as express from 'express';

// BACKEND INTERFACES
import { ServerMessage, IServerMessage } from './../json-formats/backend-interfaces/server-message.backend';
import { IUser, User } from '../json-formats/backend-interfaces/user.backend';
import { IQuestion, Question } from '../json-formats/backend-interfaces/question.backend';

// MONGO INTERFACES
import { IUserModel } from '../json-formats/mongo-interfaces/user-model.mongo';
import { IQuestionModel } from '../json-formats/mongo-interfaces/question-model.mongo';
import { IAnswerModel } from '../json-formats/mongo-interfaces/answer-model.mongo';

// wraps all currently used models in a quick lookup object
const models = {
    Question: mongoose.model<IQuestionModel>('question'),
    Answer: mongoose.model<IAnswerModel>('answer'),
    User: mongoose.model<IUserModel>('user'),
}

export const QuestionAnswerController = {
    addQuestion: (req: express.Request, res: express.Response) => {
        const newQuestion = new models.Question(req.body);
        newQuestion.save((err, prod) => {
            if (prod) {
                res.json(new ServerMessage(true, prod));
            } else {
                res.json(new ServerMessage(false, prod));
            }
        });
    },

    addAnswer: (req: express.Request, res: express.Response) => {
        const newAnswer = new models.Answer(req.body);
        newAnswer.poster = req.session._id;
        models.Question.findById(req.params.id, (err, data) => {
            if (data) {
                newAnswer.question = data._id;
                newAnswer.save((err, product) => {
                    if (!err) {
                        data.answers.push(newAnswer._id);
                        data.save((err, product) => { });
                        res.json(new ServerMessage(true, product));
                    } else {
                        res.json(new ServerMessage(false, product));
                    }
                })
            } else {
                console.log(res, err);
            }
        });
    },

    getQuestions: (req: express.Request, res: express.Response) => {
        models.Question.find({}).populate('answers').exec((err, data) => {
            if (data) {
                res.json(new ServerMessage(true, data));
            } else {
                res.json(new ServerMessage(false, data));
            }
        });
    },

    getQuestionById: (req: express.Request, res: express.Response) => {
        const id = req.params.id;
        models.Question.findById(id).populate('answers').populate({
            path: 'answers',
            populate: {
                path: 'poster'
            }
        }).exec((err, data) => {
            res.json(new ServerMessage(true, data));
        });
    },
    getAnswerById: (req: express.Request, res: express.Response) => {
        const id = req.params.id;
        models.Answer.findById(id).populate('poster').exec((err, data) => {
            res.json(data);
        })
    },
    addLike: (req: express.Request, res: express.Response) => {
        models.Answer.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, (err, data) => {
            if (err) {
                res.json(new ServerMessage(false, data));
            } else {
                res.json(new ServerMessage(true, data));
            }
        });
    }
}


async function addPosters(req: express.Request, res: express.Response, question: IQuestionModel) {
    for (const answer of question.answers) {
        models.User.findById(answer.poster._id, (err, data) => {
            answer.poster = data;
        });
    }
}