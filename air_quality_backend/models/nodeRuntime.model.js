'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

let NodeRuntimeSchema = new Schema({
	station_code: {
			type: Number,
			required: true
	},
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

});

module.exports = mongoose.model('NodeRuntime', NodeRuntimeSchema);
