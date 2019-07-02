
var Orders = require('../models/Orders');
var OrderStatus = require('../../config/OrderStatuses');

var service = {


    getOrders: async function (pageNo, OrderType,from,to) {

        var pageSize = 25;

        try {

            var findString = {}

            if (OrderType) findString['products.productStatus'] = OrderType;

            if(from && to ){
                from = from.split('-').map(el=>Number(el));
                to = to.split('-').map(el=>Number(el));

                
                console.log('from',new Date(from[0],from[1],from[2]));
                console.log('to',new Date(to[0],to[1],to[2]));
                

                findString['orderDate']={'$gte':new Date(from[0],from[1],from[2]), '$lt':new Date(to[0],to[1],to[2])};
            }


            var res = await Orders.find(findString).skip(pageNo * pageSize).limit(pageSize).lean();
            
            var results = [];

            res.forEach(order => {
                let mOrder = {
                    orderId: order.orderId,
                    date: order.orderDate,
                    products: [],
                }

                order.products.forEach(prod => {
                    
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