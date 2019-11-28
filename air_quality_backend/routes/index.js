'use strict';
import express from 'express';

const app = express.Router();

const node_controller = require('../controllers/node.controller');

app.route('/seed-data')
    .get(node_controller.seed_node_info);

app.route('/nodes')
    .get(node_controller.list_all_nodes)


app.route('/node')
    .get(node_controller.read_a_node)
//   .put(node_controller.update_a_node)
//   .delete(node_controller.delete_a_node);

module.exports = app;