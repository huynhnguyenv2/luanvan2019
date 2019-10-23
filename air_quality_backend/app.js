import bodyParser from 'body-parser';
import getFireBase from './services/firebase.service';
import routes from './routes/routes'


const port = 3000; 
const express = require("express");
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(routes); 


getFireBase.on("value", function(snapshot) {
  var data = snapshot.val();  
  console.log(data);
});

server.listen(port, () =>{ console.log('Server is running ' + port); })


