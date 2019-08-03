var path = require('path');
var Orders = require('../models/Orders');
var newOrders = require('../models/newOrders');
var OrderStatus = require('../../config/OrderStatuses');
var OrderService = require('../services/OrderService');
var OrderStatus = require('../../config/OrderStatuses');
var chats = require('../models/chat');
var Categories = require('../models/categories');

var OrdersController = {

    index: async function (req, res) {
        res.sendFile('orders.html', { root: path.join(__dirname, '../../public/pages') });
    },

    listing: async function (req, res) {
        res.sendFile('listings.html', { root: path.join(__dirname, '../../public/pages') });
    },

    transactions: async function (req, res) {
        res.sendFile('transactions.html', { root: path.join(__dirname, '../../public/pages') });
    },

    // getLength:async function(req,res){
    //     try{
    //     var result = await Orders.find({}).lean();
    //     // console.log("Result",result);
    //     // var length = 0;
    //     var aman =await OrderService.getLength(result);

    //     res.send({
    //         data:aman,
    //         success: 1
    //     })
    // }
    // catch(err){
    //     console.log(err);

    // }
    // },

    allOrders: async function (req, res) {


        try {
            var pageno = req.query.pageNo;
            var from = req.query.from;
            var to = req.query.to;

            console.log("Req", req);

            if (!pageno) pageno = 0;

            var results = await OrderService.getOrders(pageno, from, to);

            res.status(200).send({
                success: true,
                code: 200,
                data: results,
            });

        } catch (error) {
            res.status(500).send({
                success: false,
                code: 500,
                msg: error,
            });
        }
    },

    lastOneMonth: async function (req, res) {

        try {


        }
        catch (error) {
            res.status(500).send({
                success: false,
                code: 500,
                msg: error
            });
        }
    },

    DeliveredOrders: async function (req, res) {

        try {

            var pageno = req.query.pageNo;

            if (pageno === undefined || pageno === null) pageno = 0;

            var results = await OrderService.getOrders(pageno, OrderStatus.DELIVERED, req.query.from, req.query.to);

            res.status(200).send({
                success: true,
                code: 200,
                data: results,
            });

        } catch (error) {
            res.status(500).send({
                success: false,
                code: 500,
                msg: error,
            });
        }
    },

    CancelledOrders: async function (req, res) {
        try {
            var pageno = req.query.pageNo;

            if (!pageno) pageno = 0;

            var results = await OrderService.getOrders(pageno, OrderStatus.CANCELLED, req.query.from, req.query.to);

            res.status(200).send({
                success: true,
                code: 200,
                data: results,
            });

        } catch (error) {
            res.status(500).send({
                success: false,
                code: 500,
                msg: error,
            });
        }
    },

    placedOrders: async function (req, res) {
        try {
            var pageno = req.query.pageNo;

            if (!pageno) pageno = 0;

            var results = await OrderService.getOrders(pageno, OrderStatus.ORDER_PLACED, req.query.from, req.query.to);

            res.status(200).send({
                success: true,
                code: 200,
                data: results,
            });

        } catch (error) {
            res.status(500).send({
                success: false,
                code: 500,
                msg: error,
            });
        }
    },

    readyToShipOrders: async function (req, res) {
        try {
            var pageno = req.query.pageNo;

            if (!pageno) pageno = 0;

            var results = await OrderService.getOrders(pageno, OrderStatus.READY_TO_SHIP, req.query.from, req.query.to);

            res.status(200).send({
                success: true,
                code: 200,
                data: results,
            });

        } catch (error) {
            res.status(500).send({
                success: false,
                code: 500,
                msg: error,
            });
        }
    },

    shippedOrders: async function (req, res) {
        try {
            var pageno = req.query.pageNo;

            if (!pageno) pageno = 0;

            var results = await OrderService.getOrders(pageno, OrderStatus.SHIPPED, req.query.from, req.query.to);

            res.status(200).send({
                success: true,
                code: 200,
                data: results,
            });

        } catch (error) {
            res.status(500).send({
                success: false,
                code: 500,
                msg: error,
            });
        }
    },


    status: async function (req, res) {
        try {

            var status = req.body.status;
            var id = req.body.id;

            var result = await Orders.update({ "_id": Object(id) }, { $set: { "status": status } });
            res.json({ "success": 1 })

        } catch (err) {
            console.log(err);
            res.json({ "success": 0 });

        }
    },

    inTransitOrders: async function (req, res) {
        try {
            var pageno = req.query.pageNo;

            if (!pageno) pageno = 0;

            var results = await OrderService.getOrders(pageno, OrderStatus.PICKUP_IN_TRANSIT, req.query.from, req.query.to);

            res.status(200).send({
                success: true,
                code: 200,
                data: results,
            });

        } catch (error) {
            res.status(500).send({
                success: false,
                code: 500,
                msg: error,
            });
        }
    },


    search: async function (req, res) {
        try {

            var body = req.body;
            var errMsg = undefined;

            // if(body.orderType === undefined) errMsg='OrderType Not Found';
            if (body.searchBy === undefined) errMsg = 'searchBy Not Found';
            if (body.searchString === undefined) errMsg = 'searchString Not Found';


            if (errMsg) {
                return res.status(400).send({
                    code: 400,
                    success: false,
                    msg: errMsg
                });
            }


            var result = await OrderService.search(body.orderType, body.searchBy, body.searchString);

            return res.status(200).send({
                code: 200,
                success: true,
                data: result
            });

        } catch (error) {
            console.log('err', error);

            res.status(500).send({
                code: 500,
                success: false,
                msg: error
            });
        }
    },


    getOrders: async function (req, res) {


        try {
            var pageno = parseInt(req.body.pageNo);
            var from = parseInt(req.body.from);
            var to = parseInt(req.body.to);

            console.log("Req", req);

            if (!pageno) pageno = 0;

            var results = await OrderService.getOrders(pageno, from, to);

            res.status(200).send({
                success: true,
                code: 200,
                length: results.length,
                data: results,
            });

        } catch (error) {
            res.status(500).send({
                success: false,
                code: 500,
                msg: error,
            });
        }
    },


    getAllUniqueStatus: async function (req, res) {


        try {

            var results = await OrderService.getAllUniqueStatus();
            var orderType = req.body.orderType;


            res.status(200).send({
                success: true,
                code: 200,
                length: results.length,
                data: results,
            });

        } catch (error) {
            console.log("error", error);
            res.status(500).send({
                success: false,
                code: 500,
                msg: error,
            });
        }
    },

    changeStatus: async function (req, res) {
        try {
            var id = Number(req.body.transactionId);
            console.log("Id", id);
            var result = await newOrders.find({ "products.transactionId": id }, { _id: 0, "products.$": 1 }).lean();
            console.log("Result", result);
            res.json({
                result1: result
            })
        }
        catch (err) {
            console.log(err);

        }
    },
    changed: async function (req, res) {
        try {
            var commission = Number(req.body.commission);
            var earning = Number(req.body.earnings);
            var transactionType = req.body.transactionType;
            var percent = Number(req.body.percent);
            var transactionId = Number(req.body.transactionId);
            // var index = Number(req.body.index);
            // var aman = "products."+index;

            // var str = ""++"";
            var result = await newOrders.updateOne({ "products.transactionId": transactionId }, { $set: { "products.$.transactionType": transactionType, "products.$.money.seller.commision": commission, "products.$.money.seller.commisionPercent": percent, "products.$.money.seller.productEarnings": earning } }).lean();

            // `kdjfdjkd${aman} kjhsckjhs sjdhjsdh` 

            console.log("Result", result);
            res.send({
                success: 1,
                result: result
            })
        }
        catch (err) {
            console.log(err);
        }
    },

    getChats: async function (req, res) {
        try {
            var pageNo = req.body.pageNo

            var result = await chats.find({}, { _id: 1, product: 1 }).skip(pageNo * 10000).limit(10000).lean();
            // console.log("Result", result);
            res.send({
                success: 1,
                data: result
            })

        }
        catch (err) {
            console.log(err);
        }
    },
    updateChats: async function (req, res) {
        try 
        {
            var arr = req.body;
            console.log(JSON.stringify(arr,undefined,3));

            for (i = 0; i < arr.length; i++) {
                var result = await chats.updateOne({ _id: arr[i]._id }, { '$set': { "product.sku": arr[i].sku } }).lean();
               
                console.log("arr", arr[i].sku);
                // console.log(result + ". " + i);
            }
            res.send({
                success:1
            })
        }
        catch (err) {
            console.log(err);
        }
    },



    getCounterId:async function (counterName){
        var counterSeq;
        try{
        var data=await countersModel.findOneAndUpdate({counterName:counterName}, {$inc:{counterSeq:1}}, {new: true}).lean();
        counterSeq=data.counterSeq;
        return counterSeq;
        }catch(e){
        console.log(e);
        return "NIL";
        }
    },

    uploadBulk: async function(req, res){
        try{
            var obj = req.body.obj;
            counter = await this.getCounterId('products');
            obj.productId = counter;
            obj.baseProduct = counter;
            console.log("obj",JSON.stringify(obj,undefined,3));
            // var result = newOrders.create(obj)

        }
        catch(err){
            console.log("Error",err);
            res.send({
                success: false
            })
        }
    },

    getNewCategories: async function(req,res){
        try {
            var result = await Categories.find({}).lean();
            res.send({
                result:result
            })
        }
        catch(err){
            console.log(err);
        }
    }
}





module.exports = OrdersController;