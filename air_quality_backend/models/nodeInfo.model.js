'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let NodeInfoSchema = new Schema({
	code: {
		type: Number,
		required: true
	},
	station: {
		type: String,
		required: true
	},
	lat: {
		type: Number,
		required: true
	},
	long: {
		type: Number,
		required: true
	}
}, { _id: false });

module.exports = mongoose.model('NodeInfo', NodeInfoSchema);
