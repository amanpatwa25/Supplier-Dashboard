var path  =  require('path');
var Orders = require('../models/Orders');

var OrdersController ={

    index : async function(req,res){
        console.log('inside index');
        
        res.sendFile('orders.html', { root: path.join(__dirname, '../../public/pages') });
    },

    test: async function(req,res){
        console.log('inside test');

        try{
            
            var result = await Orders.find({}).limit(100).lean();
            console.log('res length',result.length);
            
            res.send(result);
        }catch(err){
            console.log('inside err',err);
            
            res.send(err);
        }

    }
}

module.exports = OrdersController;