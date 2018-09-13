// Dependencies

import * as mongoose from 'mongoose';
import { IUserModel } from '../json-formats/mongo-interfaces/user-model.mongo';

// sets base format for user schema model

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minlength: [3, 'name must be at least 3 characters long'],
        maxlength: [255, 'name cannot be longer then 255 characters']
    },
}, { timestamps: true});

// adds the schema as a collection
mongoose.model('user', UserSchema)