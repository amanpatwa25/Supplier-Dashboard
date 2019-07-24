var User = require('../models/User');

var service = {

    getUser : async function(userId){
        try {
            var result = await User.findOne({"userId":userId}).lean();
            return result; 
        } catch (error) {
            console.log('err in service',err);
            return error;
        }
    }
}



module.exports=service;