'use strict';
import express from 'express';

const app = express.Router();

const node_controller = require('../controllers/node.controller');

app.route('/seed-data')
    .get(node_controller.seed_node_info);

app.route('/training')
    .get(node_controller.training_data);

app.route('/nodes')
    .get(node_controller.list_all_nodes)

app.route('/prediction')
    .get(node_controller.get_predict_data)

app.route('/node')
    .get(node_controller.read_a_node)


module.exports = app;