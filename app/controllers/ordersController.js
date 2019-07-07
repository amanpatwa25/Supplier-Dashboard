var path  =  require('path');
var Orders = require('../models/Orders');
var OrderStatus = require('../../config/OrderStatuses');
var OrderService = require('../services/OrderService');
var OrderStatus = require('../../config/OrderStatuses');
var template = require('../models/template');
var ObjectId = require('mongodb').ObjectID;

var OrdersController ={

    index : async function(req,res){
        res.sendFile('orders.html', { root: path.join(__dirname, '../../public/pages') });
    },

    listing : async function(req,res){        
        res.sendFile('listings.html', { root: path.join(__dirname, '../../public/pages') });
    },

    transactions : async function(req,res){
        res.sendFile('transactions.html', { root: path.join(__dirname, '../../public/pages') });
    },

    allOrders:async function(req,res){


        try {
            var pageno = req.query.pageNo;
            var from = req.query.from;
            var to = req.query.to;

            if(!pageno) pageno = 0;

            var results  = await OrderService.getOrders(pageno,null,from,to);

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

            var results  = await OrderService.getOrders(pageno,OrderStatus.DELIVERED,req.query.from,req.query.to);

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


    updateTemplateId: async function(req,res){
        try{
            // var body = JSON.parse(req.body);
            console.log(req.body);
            var indexes = req.body.index;
            var templateId = req.body.templateId;
            if(indexes.length === 2 ){
            
                var str = "sellInit.categories."+ indexes[0]+".endNodeData."+indexes[1]+".templateId";
                // var test[str]=templateId;
                var results = await template.updateOne({_id:'5d221eee46dc560a8f2c193c'},{"$set":{[str]:templateId}});
                console.log("result1",results);
                
            }
            else{
                
            var str = "sellInit.categories."+ indexes[0]+".data."+indexes[1]+".endNodeData."+indexes[2]+".templateId";
            var results = await template.updateOne({_id:'5d221eee46dc560a8f2c193c'},{"$set": {[str] :templateId}});
            console.log("result2",results);
            }
            // console.log(results);

            res.json({"success":1});
            
        }
        catch(err){
            console.log(err);
            res.json({"success":0});
        }
    },

    getSellInit: async function(req,res){
        try{
            var result = await template.find({_id:'5d221eee46dc560a8f2c193c'});
            console.log("Result",JSON.stringify(result,undefined,3));
            res.json({sellInit: result});
            
        }
        catch(err){
            console.log(err);
            
        }
    },

    CancelledOrders:async function(req,res){
        try {
            var pageno = req.query.pageNo;

            if(!pageno) pageno = 0;

            var results  = await OrderService.getOrders(pageno,OrderStatus.CANCELLED,req.query.from,req.query.to);

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

            var results  = await OrderService.getOrders(pageno,OrderStatus.ORDER_PLACED,req.query.from,req.query.to);

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

            var results  = await OrderService.getOrders(pageno,OrderStatus.READY_TO_SHIP,req.query.from,req.query.to);

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

            var results  = await OrderService.getOrders(pageno,OrderStatus.SHIPPED,req.query.from,req.query.to);

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
            
        }catch(err){
            console.log(err);
            res.json({"success":0});
            
        }
    },

    inTransitOrders:async function(req,res){
        try {
            var pageno = req.query.pageNo;

            if(!pageno) pageno = 0;

            var results  = await OrderService.getOrders(pageno,OrderStatus.PICKUP_IN_TRANSIT,req.query.from,req.query.to);

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


    search: async function(req,res){
        try {
      
            var body = req.body;
            var errMsg = undefined;

            // if(body.orderType === undefined) errMsg='OrderType Not Found';
            if(body.searchBy === undefined) errMsg='searchBy Not Found'; 
            if(body.searchString === undefined) errMsg='searchString Not Found'; 


            if(errMsg){
              return res.status(400).send({
                    code:400,
                    success:false,
                    msg:errMsg
                });
            }


            var result = await OrderService.search(body.orderType,body.searchBy,body.searchString);

            return res.status(200).send({
                code:200,
                success:true,
                data:result
            });
            
        } catch (error) {
            console.log('err',error);
            
            res.status(500).send({
                code:500,
                success:false,
                msg:error
            });
        }
    },
}

module.exports = OrdersController;