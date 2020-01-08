import bodyParser from 'body-parser';
import routes from '../routes'
import getDataFromMqtt from '../service/getDataMqtt.service'
import mongoose from '../config/mongoose.config'

import NodeInfo from '../models/nodeInfo.model'
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));  

const port = 4000; 
const express = require("express");
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(routes); 


getDataFromMqtt();
server.listen(port, () =>{ console.log('Server is running ' + port); })


