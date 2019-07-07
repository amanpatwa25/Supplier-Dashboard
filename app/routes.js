var OrdersController = require('./controllers/ordersController');

module.exports = function(app){

    //middle ware
    // app.use("/")

    app.route("/").get(OrdersController.index);
    app.route("/listing").get(OrdersController.listing);
    app.route("/transaction").get(OrdersController.transactions);
    

    app.route('/allOrders').get(OrdersController.allOrders);   // all orders tab
    app.route('/deliveredOrders').get(OrdersController.DeliveredOrders);  // delivered tab
    app.route('/cancelledOrders').get(OrdersController.CancelledOrders);    //cancelled tab
    app.route('/placedOrders').get(OrdersController.placedOrders);   //create orders awbs tab
    app.route('/readyToShipOrders').get(OrdersController.readyToShipOrders); //create pacakages tab
    app.route('/shippedOrders').get(OrdersController.shippedOrders);    // shipped Orders
    app.route('/inTransitOrders').get(OrdersController.inTransitOrders); //intransit order
    app.route('/updateTemplateId').post(OrdersController.updateTemplateId);
    app.route('/getsellInit').post(OrdersController.getSellInit);
    app.route('/changeOrderStatus').post(OrdersController.status);
    app.route('/bulksellinit').post(OrdersController.bulksellinit);

    app.route('/search').post(OrdersController.search);


    app.use(function(req,res,next){
        res.status(404).send("page not found");
    });
}