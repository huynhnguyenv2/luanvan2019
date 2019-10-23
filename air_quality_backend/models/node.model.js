'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let NodeSchema = new Schema({
	station: {type: String},
	lat: {type: Number},
	long: {type: Number},
	datetime: {type: Date, default: Date.now()},
	so2: {type: Number},
	o2: {type: Number},
	no2: {type: Number},
	pm10: {type: Number},
	co: {type: Number}
});

module.exports = mongoose.model('Nodes', NodeSchema);
