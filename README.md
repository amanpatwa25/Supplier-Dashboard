# Supplier-Dashboard

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

'/allOrders'            : all orders tab
'/deliveredOrders'      : delivered tab
'/cancelledOrders'      : cancelled tab
'/placedOrders'         : create orders awbs tab
'/readyToShipOrders'    : create pacakages tab
'/shippedOrders'        : shipped Orders
'/inTransitOrders'      : intransit order

### url queries for above endpoints

pageNo : ( starts from zero)
from : filter orders after this date
to :  filter order upto this date

eg:-
```
{url}?pageNo=0&from=2017-01-01&to=2018-04-03
```