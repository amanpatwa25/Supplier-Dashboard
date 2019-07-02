var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');

var app = express();
app.use(morgan('dev'));

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(__dirname+"/public"));
// app.use(express.static(__dirname+"/public/pages"));


var mongoConn =  require('./database/mongoConn');


//add routes here

var routes = require('./app/routes');
routes(app);



app.listen(8000, function() {
    console.log("Express server listening on port " + 8000);
});      