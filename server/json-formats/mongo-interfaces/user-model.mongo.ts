// Dependencies

import * as mongoose from 'mongoose';
import { IUser } from '../backend-interfaces/user.backend';

/**
 * captures modifies received user data from mongo db
 */

export interface IUserModel extends mongoose.Document, IUser {

}