var mongoConn =  require('../../database/mongoConn');
const mongoose = require('mongoose');


var Orders=mongoose.Schema({

},{
    strict:false,
});

// module.exports = mongoose.model('OperationTesting',Orders,'OperationTesting');
module.exports = mongoose.model('chats',Orders,'chats');

