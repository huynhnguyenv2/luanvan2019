'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let NodeInfoSchema = new Schema({
	code: {types: Number},
	station: {type: String},
	lat: {type: Number},
	long: {type: Number},
	status: {type: String}
});

module.exports = mongoose.model('Nodes', NodeInfoSchema);
