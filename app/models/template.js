var mongoConn =  require('../../database/mongoConn');
const mongoose = require('mongoose');


var Orders=mongoose.Schema({

},{
    strict:false,
});

module.exports = mongoose.model('NS_test_tempEngine',Orders,'NS_test_tempEngine');
