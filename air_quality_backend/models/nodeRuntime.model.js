'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
	}
});

module.exports = mongoose.model('NodeRuntime', NodeRuntimeSchema);
