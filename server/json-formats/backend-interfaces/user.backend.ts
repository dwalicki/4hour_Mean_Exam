// base implementation of IUser //

export interface IUser {
    name: string;
    _id: number;
}

// base user class which implements base IUser //

export  class User implements IUser {
    name: string;
    _id: number
}

