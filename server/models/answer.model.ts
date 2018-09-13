// Dependencies

import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

const AnswerSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'must be filled out'],
        minlength: [5, 'content must be longer than 5 characters'],
    },
    details: {
        type: String,
    },
    poster: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'question'
    },
    likes: {
        type: Number,
        default: 0
    }
}, { timestamps: true});

// adds the schema as a collection
mongoose.model('answer', AnswerSchema);