// Dependencies

import { IUser } from '../interfaces/user';

export class User implements IUser {
    _id: string;
    message?: string;
    name: string;
}