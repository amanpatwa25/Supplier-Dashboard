var mongoConn =  require('../../database/mongoConn');
const mongoose = require('mongoose');


var Orders=mongoose.Schema({

},{
    strict:false,
});

module.exports = mongoose.model('NS_new_sellinit',Orders,'NS_new_sellinit');
