
var Orders = require('../models/Orders');
var OrderStatus = require('../../config/OrderStatuses');

var service = {


    getOrders : async function (pageNo,OrderType) {
        
        var pageSize = 25;

        try {
            
            var findString = {}

            if(OrderType)findString['products.productStatus']=OrderType;

            var res= await Orders.find(findString).skip(pageNo*pageSize).limit(pageSize).lean();

            return res;
        } catch (error) {
            console.log('err in service',error);
            
        }
    },
}


module.exports=service;