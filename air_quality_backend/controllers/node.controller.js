'use strict';
import NodeInfo from '../models/nodeInfo.model'
import NodeRunTime from '../models/nodeRuntime.model'
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

exports.list_all_nodes = function(req, res) {
	NodeInfo.find({}, function(err, data) {
    if (err){
			res.send(err);
		}
		else {
			res.json(data);
		}
  });
};
  
exports.seed_node_info = function(req, res) {
	NodeInfo.find({}, (err, docs) => {
		if (docs.length === 0) {
			let data=[]
			fs.createReadStream(path.join(__dirname, '..') + '/stations.csv')
				.pipe(csv())
				.on('data', (row) => {
					if (data.length < 5){
						data.push({
							code: parseInt(row.id),
							station: row.name,
							lat: parseFloat(row.lat),
							long: parseFloat(row.lon)
						})
					}
					
				})
				.on('end', () => {
					NodeInfo.insertMany(data)
					.then((docs) =>{
							res.json(docs);
					})
					.catch((err) => {
							res.status(500).send(err);
					});
				})
		} else {
			res.json({
				"error": "The data has been created."
			})
		}
	})	
};

exports.read_a_node = function(req, res) {
	NodeRunTime.find({station_code: parseInt(req.query.code)}, function(err, node) {
		if (err){
			res.send(err);
		}			
		else
			res.json(node);
	});
};

// exports.update_a_node = function(req, res) {
// 	Node.findOneAndUpdate({_id: req.params.nodeId}, req.body, {new: true}, function(err, node) {
// 		if (err)
// 		res.send(err);
// 		res.json(node);
// 	});
// };

// exports.delete_a_node = function(req, res) {
// 	Node.remove({
// 		_id: req.params.nodeId
// 	}, function(err, node) {
// 		if (err)
// 		res.send(err);
// 		res.json({ message: 'Task successfully deleted' });
// 	});
// };