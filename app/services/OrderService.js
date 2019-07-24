
var Orders = require('../models/Orders');
var OrderStatus = require('../../config/OrderStatuses');
var NewOrders = require('../models/newOrders');

var service = {


    // getLength: async function(result){
    //     var length = 0
    //     result.forEach(function(prod){
    //         if(prod.products){
    //         count = prod.products.length;

    //         length += count;
    //         console.log("Length",length)
    //         }
    //     })
    //     return length
    // },

    getOrders: async function (pageNo, from, to, OrderType) {

        var pageSize = 25;

        try {

            var findString = {}

            if (OrderType) findString['products.productStatus'] = OrderType;

            if (from && to) {
                // from = from.split('-').map(el=>Number(el));
                // to = to.split('-').map(el=>Number(el));

                console.log("from", from);
                console.log("to", to);

                // console.log('from',(new Date(from[0],from[1],from[2])).getTime()/1000.0);
                // console.log('to',(new Date(to[0],to[1],to[2]))/1000.0);

                findString['orderDate'] = { '$gte': from, '$lt': to }
                // findString['orderDate']={'$gte':((new Date(from[0],from[1],from[2]))/-1000), '$lt':((new Date(to[0],to[1],to[2]))/-1000)};
            }
            console.log("pageNo", pageNo);
            console.log('findstring', JSON.stringify(findString, null, 3));


            var res = await NewOrders.find(findString).sort({ orderDate: 1 }).lean();
            console.log('res', res.length);

            var results = [];

            res.forEach(order => {

                // let mOrder = {
                //     orderId: order.orderId,
                //     orderDate: order.orderDate,
                //     products: [],
                //     totalAmt:0,
                //     allSkus:[],
                // };

                order.products.forEach(prod => {

                    if (prod.productStatus !== OrderType) return;

                    // mOrder.products.push({
                    results.push({

                        orderId: order.orderId,
                        orderDate: order.orderDate,
                        productId: prod.productId,
                        transactionId: prod.transactionId,
                        // sku:        prod.productDetails.variantSku,
                        title: prod.productDetails.title,
                        transactionType: prod.transactionType,
                        // description: prod.productDetails.description,
                        listedPrice: prod.money.seller.listedPrice,
                        soldAt: prod.money.transaction.soldAt,
                        productStatus: prod.productStatus,
                        quantity: prod.quantity ? (prod.quantity) : 1,                      //change this later
                        thumb: prod.productDetails.thumb,
                        buyer: order.buyer,
                        seller: prod.seller,
                    });

                    // mOrder.totalAmt += prod.money.seller.listedPrice;
                    // mOrder.allSkus.push(prod.productDetails.variantSku);
                });

                // if(!mOrder.products.length) return;

                // results.push(mOrder);
            });
            return results;
        } catch (error) {
            console.log('err in service', error);

        }
    },

    // sendAsPerToAndFrom: async function(from,to)

    search: async function (OrderType, searchBy, searchString) {

        var findString = {};

        try {
            if (OrderType) findString['products.productStatus'] = OrderType;

            if (searchString && searchBy) {
                if (searchBy === 'SKU') findString['products.productDetails.variantSku'] = searchString;
                if (searchBy === 'orderId') findString['orderId'] = Number(searchString);
                // if(searchBy==='SPU') findString['product.productDetails.variantSku']=searchString;                

            }

            console.log('findString in search  ', findString);

            var res = await Orders.find(findString).lean();

            var results = [];

            res.forEach(order => {

                let mOrder = {
                    orderId: order.orderId,
                    date: order.orderDate,
                    products: [],
                    totalAmt: 0,
                    allSkus: [],
                }

                order.products.forEach(prod => {

                    if (!prod.productDetails || !prod.money) return;

                    mOrder.products.push({
                        productId: prod.productId,
                        sku: prod.productDetails.variantSku,
                        title: prod.productDetails.title,
                        description: prod.productDetails.description,
                        price: prod.money.seller.listedPrice,
                        productStatus: prod.productStatus,
                        qty: 1,                      //change this later
                        imageUrl: prod.productDetails.thumb,
                    });

                    mOrder.totalAmt += prod.money.seller.listedPrice;
                    mOrder.allSkus.push(prod.productDetails.variantSku);
                });

                if (!mOrder.products.length) return;

                results.push(mOrder);
            });
            return results;
        } catch (err) {
            console.log('err', err);
        }
    },


    getAllUniqueStatus: async function () {
        try {
            var results = await Orders.find({}).distinct("products.productStatus").lean();
            return results;
        } catch (error) {
            console.log("error", error);

        }
    },

    find: async function () {
        try {
            if (OrderType) find['status.productStatus'] = OrderType;
            if (prod.productStatus != OrderType) return;
            if (searchBy === 'productStatus') find['products.productStatus'] = searchString;
            if (searchBy === 'products') find['logtype'] = Number(searchString);
            // if(searchBy==='SPU') findString['product.productDetails.variantSku']=searchString;                

        }
        catch (err) {
            console.log(err);
        }


        // console.log('find in search  ',find);
    },

}
//     var res = await Orders.find(findString).lean();

//     var results = [];

//         res.forEach(order => {

//             let mOrder = {
//                 orderId: order.orderId,
//                 date: order.orderDate,
//                 products: [],
//                 totalAmt:0,
//                 allSkus:[],
//             }

//             order.products.forEach(prod => {

//                 if(!prod.productDetails || !prod.money) return;

//                 mOrder.products.push({
//                     productId:  prod.productId,
//                     sku:        prod.productDetails.variantSku,
//                     title:      prod.productDetails.title,
//                     description: prod.productDetails.description,
//                     price:      prod.money.seller.listedPrice,
//                     productStatus: prod.productStatus,
//                     qty:        1,                      //change this later
//                     imageUrl:   prod.productDetails.thumb,
//                 });

//                 mOrder.totalAmt += prod.money.seller.listedPrice;
//                 mOrder.allSkus.push(prod.productDetails.variantSku);
//             });

//             if(!mOrder.products.length) return;

//             results.push(mOrder);
//         });
//         return results;
// }catch(err){
//     console.log('err',err);
// }
// },















module.exports = service;