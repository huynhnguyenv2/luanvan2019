'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let NodeRuntimePrediction = new Schema({
	station_code: {
        type: Number,
        required: true
    },
    prediction: [{
        date_time: {
            type: String,
            required: true
        },
        so2: {
            type: Number
        },
        no2: {
            type: Number
        },
        o2: {
            type: Number
        },
        co: {
            type: Number
        },
        pm10: {
            type: Number
        }, 
        temp: {
            type: Number
        },
        humi: {
            type: Number
        },
        light: {
            type: Number
        }
    }]
    
}, { _id: false });

module.exports = mongoose.model('NodeRuntimePrediction', NodeRuntimePrediction);
