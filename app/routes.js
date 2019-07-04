var OrdersController = require('./controllers/ordersController');

module.exports = function(app){

    //middle ware
    // app.use("/")

    app.route("/").get(OrdersController.index)



    app.route('/allOrders').get(OrdersController.allOrders);

    app.route('/deliveredOrders').get(OrdersController.DeliveredOrders);

    app.route('/cancelledOrders').get(OrdersController.CancelledOrders);

    app.route('/placedOrders').get(OrdersController.placedOrders);

    app.route('/readyToShipOrders').get(OrdersController.readyToShipOrders);

    app.route('/ShippedOrders').get(OrdersController.shippedOrders);
    
    app.route('/inTransitOrders').get(OrdersController.inTransitOrders);
    

    app.use(function(req,res,next){
        res.status(404).send("page not found");
    });
}