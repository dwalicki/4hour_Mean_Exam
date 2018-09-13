// Dependencies
import * as mongoose from 'mongoose';
import * as express from 'express';

// Backend Interfaces
import { ServerMessage, IServerMessage } from './../json-formats/backend-interfaces/server-message.backend';
import { IUser, User} from './../json-formats/backend-interfaces/user.backend';

// Mongo interfaces

import { IUserModel } from '../json-formats/mongo-interfaces/user-model.mongo';

const models = {
    User: mongoose.model<IUserModel>('user')
}

export const LoginRegController = {

    /**
     * checks the database to find if a given key value pair exists in the collection User
     * @param key the key to use to find if exists
     * @param value the value to use to find if use exits in the database
     */
    hasType: (key: string, value: any, callback: (success: boolean) => void) => {

        // initalize an empty object to build a key value pair
        const keyValue = {};
        keyValue[key] = value;
        models.User.findOne(keyValue, (err, res) => {
            if (!res) {
                callback(false);
            } else {
                callback(true);
            }
        });
    },

    /**
     * checks session for a given values
     * @param value value to check
     */
    checkSessionFor: (req: express.Request, res: express.Response, value: string) => {
        if (req.session[value]) {
            models.User.findById(req.session[value], (err, data) => {
                res.json(new ServerMessage(true, data));
            })
        } else {
            res.json(new ServerMessage(false, { message: `${value} does not exist in session` }));
        }
    },

    /**
     * registers a user
     */
    registerUser: (req: express.Request, res: express.Response) => {
        const user = new models.User(req.body);
        LoginRegController.hasType('name', req.body.name, (success) => {

            // if the hasType method does not return success, this means that the database does
            // not contain a user with the given info. If so, have the entered user data
            // validated and saved to the database
            console.log(success);
            if (!success) {
                user.save((err, product) => {
                    if (err) {
                        res.json(new ServerMessage(false, product));
                    } else {
                        req.session._id = product._id;
                        res.json(new ServerMessage(true, product));
                    }
                });
            } else {
                models.User.findOne({ name: req.body.name }, (err, data) => {

                    // if the user was found, check the passwords and return a
                    // server message. True will save in session, false with only send 
                    // a ServerMessage instance
                    if (data) {
                        req.session._id = data._id;
                        res.json(new ServerMessage(true, data));
                    } else {
                        res.json(new ServerMessage(false, { message: 'the information provided is invalid' }));
                    }
                });
            }
        });
    },

    /**
     * logs in or rejects a given login attempt
     */
    loginUser: (req: express.Request, res: express.Response) => {
        models.User.findOne({ name: req.body.name }, (err, data) => {

            // if the user was found, check the passwords and return a
            // server message. True will save in session, false with only send 
            // a ServerMessage instance
            if (data) {
                req.session._id = data._id;
                res.json(new ServerMessage(true, data));
            } else {
                res.json(new ServerMessage(false, { message: 'the information provided is invalid' }));
            }
        });
    },

    /**
     * clears session for a given value
     * @param value what to clear session for
     */
    clearSessionFor: (req: express.Request, res: express.Response, value: string) => {
        if (req.session[value]) {
            delete req.session[value];
            res.json(new ServerMessage(true, { message: 'session cleared successfully' }));
        } else {
            res.json(new ServerMessage(false, { message: 'value is does not exist in session' }))
        }
    },
};