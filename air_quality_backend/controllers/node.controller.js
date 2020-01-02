'use strict';
import NodeInfo from '../models/nodeInfo.model'
import RatingIndex from '../models/ratingIndex.model'
import NodeRunTime from '../models/nodeRuntime.model'
import NodeRunTimePrediction from '../models/nodeRuntimePrediction.model'
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
	res.setHeader("Content-Type", "text/html");
	var nodeInfo = '', ratingIndex = '';
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
							long: parseFloat(row.lon),
							status: ['Good'],
						})
					}
					
				})
				.on('end', () => {
					NodeInfo.insertMany(data)
					.then((docs) =>{
						console.log('nodeInfo success')
						nodeInfo = docs;
					})
					.catch((err) => {
							res.status(500).send(err);
					});
				})
		} else {
			res.status(500).send("The data has been created.")
		}
	})	
	RatingIndex.find({}, (err, docs) => {
		if (docs.length === 0) {
			let data = [
				{
					index_name: 'so2',
					max: 20,
					min: 0,
				},
				{
					index_name: 'o2',
					max: 4,
					min: 2,
				},
				{
					index_name: 'no2',
					max: 100,
					min: 0,
				},
				{
					index_name: 'co',
					max: 1,
					min: 0,
				},
				{
					index_name: 'pm10',
					max: 100,
					min: 50
				}
			]
			RatingIndex.insertMany(data)
					.then((docs) =>{
						console.log('ratingIndex success')
						ratingIndex = docs;
					})
					.catch((err) => {
							res.status(500).send(err);
					});
		} else {
			res.status(500).send("The data has been created.")
		}
	})
	res.json(ratingIndex);
};

exports.read_a_node = async function(req, res) {
	try {
		let nodePredict = await NodeRunTimePrediction.find({station_code: parseInt(req.query.code)})
			.exec()
		let node = await NodeRunTime.find({station_code: parseInt(req.query.code)})
			.exec()
		//console.log('node', node, 'nodePredict', nodePredict)
		res.json({
			node: node,
			nodePredict: nodePredict
		});
	} catch (error) {
		res.status(500).send(error);
	}			
};

exports.get_predict_data = function(req, res) {
	res.json({a : 'b'})
}