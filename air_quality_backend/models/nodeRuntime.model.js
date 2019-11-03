'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let NodeRuntimeSchema = new Schema({
  code_id: Number,
  datatime: Date,
	so2: Number,
	no2: Number,
	o2: Number,
	co: Number
});

module.exports = mongoose.model('NodeRuntime', NodeRuntimeSchema);
