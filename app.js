const express = require('express');
var app = express();
var path = require('path');
const http = require('http');
var session = require('express-session');
const uuidv1 = require('uuid/v1');
var server = http.Server(app);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const consign = require('consign');

consign()
    .include('src/routes')
    .into(app);


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("Connected to ", addr.address + ":" + addr.port);
});