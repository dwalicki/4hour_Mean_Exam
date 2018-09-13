// Dependencies

import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

// sets base format for the question schema model 
const QuestionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'must be filled out'],
        minlength: [10, 'content must be longer than 5 characters'],
    },
    details: {
        type: String,
    },
    answers: [{
        type:Schema.Types.ObjectId,
        ref: 'answer'
    }],

}, { timestamps: true, usePushEach: true});

function autoPopulateAllFields(schema) {
    var paths = '';
    schema.eachPath(function process(pathname, schemaType) {
        if (pathname=='_id') return;
        if (schemaType.options.ref)
            paths += ' ' + pathname;
    })

    schema.pre('find', handler);
    schema.pre('findOne', handler);

    function handler(next) {
        this.populate(paths);
        next();
    }
};

QuestionSchema.plugin(autoPopulateAllFields);

// adds the schema as a collection

mongoose.model('question', QuestionSchema);