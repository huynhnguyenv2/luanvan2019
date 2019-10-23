'use strict';
const Node = require('../models/node.model');

exports.list_all_nodes = function(req, res) {
	Node.find({}, function(err, node) {
	  if (err)
		res.send(err);
	  res.json(node);
	});
  };
  
  
  
  
  exports.create_a_node = function(req, res) {
	var new_node = new Node(req.body);
	new_node.save(function(err, node) {
	  if (err)
		res.send(err);
	  res.json(node);
	});
  };
  
  
  exports.read_a_node = function(req, res) {
	Node.findById(req.params.taskId, function(err, node) {
	  if (err)
		res.send(err);
	  res.json(node);
	});
  };
  
  
  exports.update_a_node = function(req, res) {
	Node.findOneAndUpdate({_id: req.params.nodeId}, req.body, {new: true}, function(err, node) {
	  if (err)
		res.send(err);
	  res.json(node);
	});
  };
  
  
  exports.delete_a_node = function(req, res) {
	Node.remove({
	  _id: req.params.nodeId
	}, function(err, node) {
	  if (err)
		res.send(err);
	  res.json({ message: 'Task successfully deleted' });
	});
  };