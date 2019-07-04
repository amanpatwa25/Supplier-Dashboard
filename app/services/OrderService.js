
var Orders = require('../models/Orders');
var OrderStatus = require('../../config/OrderStatuses');

var service = {


    getOrders: async function (pageNo, OrderType,from,to,searchString,searchBy) {

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

            // searchString='S (UK-8,B-33.5)'; searchBy='SKU';            

            if(searchString && searchBy){

                if(searchBy==='SKU') findString['products.productDetails.variantSku']=searchString;
                if(searchBy==='orderId') findString['orderId']=Number(searchString);
                // if(searchBy==='SPU') findString['product.productDetails.variantSku']=searchString;                
                 
            }

            console.log('findstring',JSON.stringify(findString,null,3));
            

            var res = await Orders.find(findString).skip(pageNo * pageSize).limit(pageSize).lean();
            console.log('res',res.length);
            
            var results = [];

            res.forEach(order => {

                let mOrder = {
                    orderId: order.orderId,
                    date: order.orderDate,
                    products: [],
                    totalAmt:0,
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
                        qty:        1,                      //change this later
                        imageUrl:   prod.productDetails.thumb,
                    });

                    mOrder.totalAmt += prod.money.seller.listedPrice;

                });
                
                if(!mOrder.products.length) return;

                results.push(mOrder);
            });
            return results;
        } catch (error) {
            console.log('err in service', error);

        }
    },
}


module.exports = service;