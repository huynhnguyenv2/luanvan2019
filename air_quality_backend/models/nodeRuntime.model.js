'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let NodeRuntimeSchema = new Schema({
  node_info_id: {types: Number},
  datatime: {types: Date},
	so2: {type: Number},
	no2: {type: Number},
	o2: {type: Number},
	co: {type: Number}
});

module.exports = mongoose.model('Nodes', NodeRuntimeSchema);
