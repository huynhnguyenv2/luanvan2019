import bodyParser from 'body-parser';
import routes from '../routes/routes'

const port = 4000; 
const express = require("express");
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(routes); 

server.listen(port, () =>{ console.log('Server is running ' + port); })


