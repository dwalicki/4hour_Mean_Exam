// Dependencies

import * as mongoose from 'mongoose';
import { IAnswer } from '../backend-interfaces/answer.backend';

/**
 * captures and modifies received user data from mongoose db
 */

export interface IAnswerModel extends mongoose.Document, IAnswer {

}