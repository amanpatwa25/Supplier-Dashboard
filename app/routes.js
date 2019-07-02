var OrdersController = require('./controllers/ordersController');

module.exports = function(app){

    //middle ware
    // app.use("/")

    app.route("/").get(OrdersController.index)

    app.route("/test").get(OrdersController.test);



    app.use(function(req,res,next){
        res.status(404).send("page not found");
    });
}