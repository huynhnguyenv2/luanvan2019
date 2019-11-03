import bodyParser from 'body-parser';
import routes from '../routes'
import getDataFromMqtt from '../service/getDataMqtt.service'

const port = 4000; 
const express = require("express");
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(routes); 

getDataFromMqtt();
server.listen(port, () =>{ console.log('Server is running ' + port); })


