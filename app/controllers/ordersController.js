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

            res.status(200).send({
                success:true,
                code:200,
                data:results,
            });

        } catch (error) {
            res.status(500).send({
                success:false,
                code:500,
                msg:error,
            });
        }
    },

    DeliveredOrders:async function(req,res){

        try {
            
            var pageno = req.query.pageNo;

            if(pageno === undefined || pageno === null) pageno = 0;

            var results  = await OrderService.getOrders(pageno,OrderStatus.DELIVERED);

            res.status(200).send({
                success:true,
                code:200,
                data:results,
            });

        } catch (error) {
            res.status(500).send({
                success:false,
                code:500,
                msg:error,
            });
        }
    },

    CancelledOrders:async function(req,res){
        try {
            var pageno = req.query.pageNo;

            if(!pageno) pageno = 0;

            var results  = await OrderService.getOrders(pageno,OrderStatus.CANCELLED);

            res.status(200).send({
                success:true,
                code:200,
                data:results,
            });

        } catch (error) {
            res.status(500).send({
                success:false,
                code:500,
                msg:error,
            });
        }
    },
    
    placedOrders:async function(req,res){
        try {
            var pageno = req.query.pageNo;

            if(!pageno) pageno = 0;

            var results  = await OrderService.getOrders(pageno,OrderStatus.ORDER_PLACED);

            res.status(200).send({
                success:true,
                code:200,
                data:results,
            });

        } catch (error) {
            res.status(500).send({
                success:false,
                code:500,
                msg:error,
            });
        }
    },

    readyToShipOrders:async function(req,res){
        try {
            var pageno = req.query.pageNo;

            if(!pageno) pageno = 0;

            var results  = await OrderService.getOrders(pageno,OrderStatus.READY_TO_SHIP);

            res.status(200).send({
                success:true,
                code:200,
                data:results,
            });

        } catch (error) {
            res.status(500).send({
                success:false,
                code:500,
                msg:error,
            });
        }
    },

    shippedOrders:async function(req,res){
        try {
            var pageno = req.query.pageNo;

            if(!pageno) pageno = 0;

            var results  = await OrderService.getOrders(pageno,OrderStatus.SHIPPED);

            res.status(200).send({
                success:true,
                code:200,
                data:results,
            });

        } catch (error) {
            res.status(500).send({
                success:false,
                code:500,
                msg:error,
            });
        }
    },


    status: async function(req,res){
        try{

            var status = req.body.status;
            var id = req.body.id;

            var result = await Orders.update({"_id":Object(id)},{$set: {"status":status}});
            res.json({"success":1})
            
        }
        catch(err){
            console.log(err);
            res.json({"success":0});
            
        }
    },

    inTransitOrders:async function(req,res){
        try {
            var pageno = req.query.pageNo;

            if(!pageno) pageno = 0;

            var results  = await OrderService.getOrders(pageno,OrderStatus.PICKUP_IN_TRANSIT);

            res.status(200).send({
                success:true,
                code:200,
                data:results,
            });

        } catch (error) {
            res.status(500).send({
                success:false,
                code:500,
                msg:error,
            });
        }
    },
}

module.exports = OrdersController;