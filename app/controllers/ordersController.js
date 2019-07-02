var path  =  require('path');
var Orders = require('../models/Orders');
var OrderStatus = require('../../config/OrderStatuses');
var OrderService = require('../services/OrderService');
var OrderStatus = require('../../config/OrderStatuses');


var OrdersController ={

    index : async function(req,res){
        console.log('inside index');
        
        res.sendFile('orders.html', { root: path.join(__dirname, '../../public/pages') });
    },

    allOrders:async function(req,res){


        try {
            var pageno = req.query.pageNo;

            if(!pageno) pageno = 0;

            var results  = await OrderService.getOrders(pageno);

            res.send(results);
        } catch (error) {
            console.log('err in controller',error);
            
        }
    },

    DeliveredOrders:async function(req,res){

        try {
            
            var pageno = req.query.pageNo;

            if(!pageno) pageno = 0;

            var results  = await OrderService.getOrders(pageno,OrderStatus.DELIVERED);

            res.send(results);
        } catch (error) {
            
        }
    },

    CancelledOrders:async function(req,res){
        try {
            var pageno = req.query.pageNo;

            if(!pageno) pageno = 0;

            var results  = await OrderService.getOrders(pageno,OrderStatus.CANCELLED);

            res.send(results);
            
        } catch (error) {
            
        }
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