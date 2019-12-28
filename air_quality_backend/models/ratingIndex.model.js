'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let RatingIndexSchema = new Schema({
    index_name: {
        type: String,
        required: true
    },
    max: {
        type: Number,
        required: true
    },
    min: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('RatingIndex', RatingIndexSchema);
