'use strict';
const express = require('express');
const app = express.Router();

const node_controller = require('../controllers/node.controller');

app.route('/nodes')
    .get(node_controller.list_all_nodes)
    .post(node_controller.create_a_node);


  app.route('/nodes/:nodeId')
    .get(node_controller.read_a_node)
    .put(node_controller.update_a_node)
    .delete(node_controller.delete_a_node);

module.exports = app;