'use strict';

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _firebase = require('../services/firebase.service');

var _firebase2 = _interopRequireDefault(_firebase);

var _routes = require('../routes/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = 3000;
var express = require("express");
var server = express();
server.use(_bodyParser2.default.json());
server.use(_bodyParser2.default.urlencoded({ extended: true }));
server.use(_routes2.default);

_firebase2.default.on("value", function (snapshot) {
  var data = snapshot.val();
  console.log(data);
});

server.listen(port, function () {
  console.log('Server is running ' + port);
});