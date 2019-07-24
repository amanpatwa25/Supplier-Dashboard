var UserServie = require('../services/UserService');

var controller = {

    getUserDetails :async function(req,res){

        console.log('req',req.body);
        
        try {
            if(!req.body.userId) res.status(400).send({success:false,msg:'userId not provided'});

            var result = await UserServie.getUser(parseInt(req.body.userId));
            res.status(200).send({
                success:true,
                code:200,
                data:result,
            });

        } catch (error) {
            res.status(500).send({
                success:false,
                code:500,
                msg:error,
            });
        }
    }

}

module.exports = controller;