// var mongoConn =  require('../../database/mongoConn');
const mongoose = require('mongoose');

var User=mongoose.Schema({

},{
    strict:false,
});

module.exports = mongoose.model('users',User,'users');

