
var Orders = require('../models/Orders');
var OrderStatus = require('../../config/OrderStatuses');

var service = {


    getOrders: async function (pageNo, OrderType) {

        var pageSize = 25;

        try {

            var findString = {}

            if (OrderType) findString['products.productStatus'] = OrderType;

            var res = await Orders.find(findString).skip(pageNo * pageSize).limit(pageSize).lean();

            var results = [];

            res.forEach(order => {
                let mOrder = {
                    orderId: order.orderId,
                    date: order.orderDate,
                    products: [],
                }

                order.products.forEach(prod => {

                    console.log('prod',JSON.stringify(prod,null,3));
                    
                    if(!prod.productDetails || !prod.money) return;
                    
                    mOrder.products.push({
                        productId:  prod.productId,
                        sku:        prod.productDetails.variantSku,
                        title:      prod.productDetails.title,
                        description: prod.productDetails.description,
                        price:      prod.money.seller.listedPrice,
                        productStatus: prod.productStatus,
                    });

                });

                results.push(mOrder);
            });
            return results;
        } catch (error) {
            console.log('err in service', error);

        }
    },
}


module.exports = service;