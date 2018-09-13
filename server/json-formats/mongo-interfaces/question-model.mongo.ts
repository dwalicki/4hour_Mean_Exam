// Dependencies

import * as mongoose from 'mongoose';
import { IQuestion } from '../backend-interfaces/question.backend';

/**
 * captures and modifies received user data from mongo db
 */

 export interface IQuestionModel extends mongoose.Document, IQuestion {
     
 }