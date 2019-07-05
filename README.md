# Supplier-Dashboard

## localhost:8000 (homePage)

## /search
type:post
req.body:
```
{
	"orderType":"CANCELLED",
	"searchBy":"SKU",
	"searchString":"M"
}
```

searchBy options :
```
"SKU"
"orderId"
"SPU" (not available currently)
```

orderType options:
```

    ORDER_PLACED:'ORDER_PLACED',
    READY_TO_SHIP:'READY_TO_SHIP',
    SHIPPED:'SHIPPED',
    PICKUP_IN_TRANSIT:'PICKUP_IN_TRANSIT',
    DELIVERED:'DELIVERED',
    CANCELLED:'CANCELLED',
    RTO:'RTO',
    RETURN_RECEIVED_AT_HUB:'RETURN_RECEIVED_AT_HUB',
    PICKUP_SCHEDULED:'PICKUP_SCHEDULED',
    SELLER_CONFIRMATION:'SELLER_CONFIRMATION',
    DELIVERED_TO_SELLER:'DELIVERED_TO_SELLER',
    START_SANITIZATION:'START_SANITIZATION',
    RETURN_PICKUP_SCHEDULED:'RETURN_PICKUP_SCHEDULED',
    PICKUP_AT_HUB:'PICKUP_AT_HUB',
    RETURN_PICKED_UP:'RETURN_PICKED_UP',

```


## all endpoints for getting orders

```
'/allOrders'            : all orders tab 
'/deliveredOrders'      : delivered tab
'/cancelledOrders'      : cancelled tab
'/placedOrders'         : create orders awbs tab
'/readyToShipOrders'    : create pacakages tab
'/shippedOrders'        : shipped Orders
'/inTransitOrders'      : intransit order
```

### url queries for above endpoints

pageNo : ( starts from zero)    <br>
from : filter orders after this date <br>
to :  filter order upto this date   <br>

eg:-
```
{url}?pageNo=0&from=2017-01-01&to=2018-04-03
```

## Orders response :

```
{
    "success": true,
    "code": 200,
    "data": [
        {
            "orderId": 24107,
            "date": "2018-02-14T18:20:16.000Z",
            "products": [
                {
                    "productId": 171428,
                    "sku": "S",
                    "title": "White choker neck tee",
                    "description": "NA",
                    "price": 250,
                    "productStatus": "ORDER_PLACED",
                    "qty": 1,
                    "imageUrl": "https://cdn2.coutloot.com/stock/172_thumb/171428_1.jpg"
                }
            ],
            "totalAmt": 250,
            "allSkus": [
                "S"
            ]
        },
        {
            "orderId": 24106,
            "date": "2018-02-19T22:03:16.000Z",
            "products": [
                {
                    "productId": 179358,
                    "sku": "",
                    "title": "Black candybar phone",
                    "description": "No Warranty_No Warranty",
                    "price": 250,
                    "productStatus": "ORDER_PLACED",
                    "qty": 1,
                    "imageUrl": "https://cdn2.coutloot.com/stock/180_thumb/179358_1.jpg"
                }
            ],
            "totalAmt": 250,
            "allSkus": [
                ""
            ]
        },
        {
            "orderId": 24105,
            "date": "2018-02-17T08:25:21.000Z",
            "products": [
                {
                    "productId": 176133,
                    "sku": "Standard",
                    "title": "necklace",
                    "description": "NA",
                    "price": 200,
                    "productStatus": "ORDER_PLACED",
                    "qty": 1,
                    "imageUrl": null
                }
            ],
            "totalAmt": 200,
            "allSkus": [
                "Standard"
            ]
        },
        {
            "orderId": 24104,
            "date": "2018-02-17T23:29:49.000Z",
            "products": [
                {
                    "productId": 124276,
                    "sku": "M",
                    "title": "Womens yellow and pink floral square-neck cap-sleeved blouse",
                    "description": "NA",
                    "price": 250,
                    "productStatus": "ORDER_PLACED",
                    "qty": 1,
                    "imageUrl": "https://cdn2.coutloot.com/stock/125_thumb/124276_1.jpg"
                }
            ],
            "totalAmt": 250,
            "allSkus": [
                "M"
            ]
        },
    ]
}
```