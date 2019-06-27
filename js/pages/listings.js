var all_months;
var selected_month;
var loaded = 0;

var chart0, chart1, chart2, chart3, chart4, chart5, chart6, chart7, chart8, chart9;
var current_months_dates = [];


$(document).ready(function() {
    setup_dropdown();
    $('#charts').hide();
    get_data("http://dev-gtw1.coutloot.com:4001/products/getMonthAllProducts", selected_month, 0);
});



function toggle_menu() {
    $("#main_menu").modal('toggle');
}

function setup_dropdown() {
    var current_month = moment();
    all_months = [];
    var stop_at = 'Dec 17';
    do {
        var month = {};
        month.year = current_month.year();
        month.month = current_month.month() + 1;
        month.display = current_month.format('MMM YY');
        all_months.push(month);
    }
    while (stop_at != current_month.subtract(1, 'months').format('MMM YY'));

    var options_html = '<option disabled>Select Month</option>';
    for (var i = 1; i < all_months.length; i++) {
        options_html = options_html + '<option>' + all_months[i].display + '</option>';
    }

    selected_month = all_months[1];
    $(".month_select").html(options_html);

}


function get_data(url, data, type) {
    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function(data) {
            console.log(data);

            switch (type) {

                case -1:
                    {
                        break;
                    }

                case 0:
                    {
                        var data_received = data.data;
                        current_months_dates = [];
                        current_month_daily_transaction_count_data_received = [];
                        current_month_daily_transaction_value_data_received = [];

                        for (var i = 0; i < data_received.length; i++) {
                            current_months_dates.push(data_received[i].listed_date);
                            current_month_daily_transaction_count_data_received.push(data_received[i].products);
                            //current_month_daily_transaction_value_data_received.push(data_received[i].orders_amount);
                        }


                        current_month_daily_transaction_count_data = [{
                            data: current_month_daily_transaction_count_data_received,
                            label: "Total Products Sold",
                            borderColor: "#3e95cd",
                            fill: false
                        }];


                        /*
                        current_month_daily_transaction_value_data = [{
                            data: current_month_daily_transaction_value_data_received,
                            label: "Value Of Products Sold",
                            borderColor: "#3e95cd",
                            fill: false
                        }];
                        */


                        //console.log(current_month_daily_transaction_count_data);
                        //console.log(current_month_daily_transaction_value_data);

                        get_data("http://dev-gtw1.coutloot.com:4001/products/getMonthProductStatus", selected_month, 1);
                        break;
                    }

                case 1:
                    {
                        var data_received = data.data;
                        current_month_daily_transaction_count_split_data_received = {};
                        var meet_and_buy = [],
                            ship_via_coutloot = [];
                        for (var i = 0; i < data_received.length; i++) {
                            meet_and_buy.push(data_received[i].approved_products);
                        }

                        console.log(meet_and_buy);
                        console.log(ship_via_coutloot);

                        current_month_daily_transaction_count_split_data_received.total = (current_month_daily_transaction_count_data_received);
                        current_month_daily_transaction_count_split_data_received.meet_and_buy = meet_and_buy;

                        current_month_daily_transaction_count_split_data = [{
                            data: current_month_daily_transaction_count_split_data_received.total,
                            label: "Total Products Listed",
                            borderColor: "#3e95cd",
                            fill: false
                        }, {
                            data: current_month_daily_transaction_count_split_data_received.meet_and_buy,
                            label: "Total Products Approved",
                            borderColor: "#f39c12",
                            fill: false
                        }];


                        console.log(current_month_daily_transaction_count_split_data);
                        get_data("http://dev-gtw1.coutloot.com:4001/products/getMonthCitySellers", selected_month, 4);


                        break;
                    }

                case 2:
                    {
                        var data_received = data.data;
                        current_month_daily_transaction_count_status_split_data_received = {};
                        var placed = [];
                        for (var i = 0; i < data_received.length; i++) {
                            placed.push(data_received[i].order_placed);
                        }

                        current_month_daily_transaction_count_status_split_data_received.placed = placed;

                        current_month_daily_transaction_count__status_split_data = [{
                            data: current_month_daily_transaction_count_status_split_data_received.placed,
                            label: "Sellers.",
                            borderColor: "#3e95cd",
                            fill: false
                        }];

                        var reduced_cancellation = [];
                        for (var i = 0; i < current_month_daily_transaction_count_data_received.length; i++) {
                            reduced_cancellation.push(current_month_daily_transaction_count_data_received[i] - cancelled[i] - returned[i]);
                        }

                        cancellations_returns_chart_data = {
                            labels: current_months_dates,
                            datasets: [{
                                label: 'Sellers',
                                backgroundColor: "#ff4757",
                                data: cancelled
                            }]
                        };

                        console.log(current_month_daily_transaction_count__status_split_data);
                        get_data("http://dev-gtw1.coutloot.com:4001/transactions/getMonthAmountsSplit", selected_month, 3);
                        break;
                    }

                case 3:
                    {
                        var data_received = data.data;
                        var via_coutloot = [],
                            meet_and_buy = []
                        current_month_daily_transaction_value_split_data = [];
                        current_month_daily_transaction_value_split_data_received = [];

                        for (var i = 0; i < data_received.length; i++) {
                            via_coutloot.push(data_received[i].coutloot_amount);
                            meet_and_buy.push(data_received[i].meetbuy_amount)
                        }

                        current_month_daily_transaction_value_split_data_received.total = current_month_daily_transaction_value_data_received;
                        current_month_daily_transaction_value_split_data_received.meet_and_buy = meet_and_buy;
                        current_month_daily_transaction_value_split_data_received.via_coutloot = via_coutloot;


                        current_month_daily_transaction_value_split_data = [{
                            data: current_month_daily_transaction_value_split_data_received.total,
                            label: "Total.",
                            borderColor: "#3e95cd",
                            fill: false
                        }, {
                            data: current_month_daily_transaction_value_split_data_received.meet_and_buy,
                            label: "Meet & Buy.",
                            borderColor: "#341f97",
                            fill: false
                        }, {
                            data: current_month_daily_transaction_value_split_data_received.via_coutloot,
                            label: "Via Coutloot.",
                            borderColor: "#ee5253",
                            fill: false
                        }];

                        console.log(current_month_daily_transaction_value_split_data);
                        get_data("http://dev-gtw1.coutloot.com:4001/transactions/getCityOrders", selected_month, 4);
                        break;
                    }

                case 4:
                    {

                        //make city data
                        var data_received = data.data;

                        city_table_html = [];
                        for (var i = 0; i < data_received.length; i++) {
                            var cell = [];
                            cell.push(data_received[i].city);
                            cell.push(data_received[i].cityId);
                            cell.push(data_received[i].sellers);
                            // cell.push((Number((data_received[i].total_products * 100) / total_products)).toFixed(2));
                            // cell.push(data_received[i].total_amount);
                            // cell.push((Number((data_received[i].total_amount * 100 / total_value))).toFixed(2));

                            city_table_html.push(cell);
                        }

                        get_data("http://dev-gtw1.coutloot.com:4001/products/getMonthAllSellers", selected_month, 5);
                        break;
                    }

                case 5:
                    {

                        var data_received = data.data;
                        current_month_daily_seller_count_data = [];
                        current_month_daily_seller_count_data_received = [];

                        for (var i = 0; i < data_received.length; i++) {
                            current_month_daily_seller_count_data_received.push(data_received[i].products);
                            //current_month_daily_transaction_value_data_received.push(data_received[i].orders_amount);
                        }

                        current_month_daily_seller_count_data = [{
                            data: current_month_daily_transaction_count_data_received,
                            label: "Sellers",
                            borderColor: "#3e95cd",
                            fill: false
                        }];

                        get_data("http://dev-gtw1.coutloot.com:4001/products/getMonthCategorySellers", selected_month, 8);
                        break;
                    }

                case 6:
                    {
                        var data_received = data.data;
                        var online_sum = 0,
                            cod_sum = 0;
                        data_received.forEach(element => {
                            online_sum = online_sum + element.online_orders;
                            cod_sum = cod_sum + element.cod_orders;
                        });
                        payment_mode_split = [(online_sum * 100 / (online_sum + cod_sum)).toFixed(2), (cod_sum * 100 / (online_sum + cod_sum)).toFixed(2)];

                        console.log(payment_mode_split);
                        get_data("http://dev-gtw1.coutloot.com:4001/transactions/getMonthCityCodSplit", selected_month, 7);
                        break;

                    }

                case 7:
                    {

                        var data_received = data.data;
                        var cities = [],
                            online = [],
                            cod = [];

                        data_received.forEach(element => {
                            cities.push(element.city);
                            online.push(((element.online_orders * 100) / (element.cod_orders + element.online_orders)));
                            cod.push(((element.cod_orders * 100) / (element.cod_orders + element.online_orders)));
                        });

                        payment_mode_split_citywise_data = {
                            labels: cities,
                            datasets: [{
                                label: 'Online Percentage',
                                backgroundColor: "#ff4757",
                                data: online
                            }, {
                                label: 'COD Percentage',
                                backgroundColor: "#eccc68",
                                data: cod
                            }]
                        };
                        console.log(payment_mode_split);
                        get_data("http://dev-gtw1.coutloot.com:4001/transactions/getMonthGenderCodSplit", selected_month, 8);
                        break;
                    }

                case 8:
                    {

                        var data_received = data.data;
                        cat_table_html = [];
                        for (var i = 0; i < data_received.length; i++) {
                            var cell = [];
                            cell.push(data_received[i].categoryString);
                            cell.push(data_received[i].sellers);
                            // cell.push((Number((data_received[i].total_products * 100) / total_products)).toFixed(2));
                            // cell.push(data_received[i].total_amount);
                            // cell.push((Number((data_received[i].total_amount * 100 / total_value))).toFixed(2));

                            cat_table_html.push(cell);
                        }
                        get_data("http://dev-gtw1.coutloot.com:4001/products/getMonthPromotedAmount", selected_month, 9);
                        break;
                    }

                case 9:
                    {
                        var data_received = data.data;
                        current_month_daily_promotion_amount_data_received = [];
                        current_month_daily_promotion_seller_count_data_received = [];

                        for (var i = 0; i < data_received.length; i++) {
                            current_month_daily_promotion_amount_data_received.push(data_received[i].amount);
                            current_month_daily_promotion_seller_count_data_received.push(data_received[i].sellers);
                        }


                        current_month_daily_promotion_amount = [{
                            data: current_month_daily_promotion_amount_data_received,
                            label: "Promoted Listings - Value",
                            borderColor: "#3e95cd",
                            fill: false
                        }];

                        current_month_daily_promotion_seller_count = [{
                            data: current_month_daily_promotion_seller_count_data_received,
                            label: "Sellers",
                            borderColor: "#3e95cd",
                            fill: false
                        }];


                        if (loaded == 0) {
                            $('#charts').show();
                            loaded = 1;
                            make_current_months_daily_transactions_chart();
                            make_current_months_daily_transactions_with_split_chart();
                            make_current_months_daily_sellers_chart();
                            make_city_wise_split_chart();
                            create_category_split_chart();
                            make_current_months_daily_promtions_amount_chart();
                            make_current_months_daily_promtions_seller_count_chart();

                            // make_payment_mode_split_chart();
                            // make_payment_mode_split_citywise_data_chart();
                            // make_payment_mode_split_genderwise_data_chart();
                            // make_current_months_daily_transactions_with_status_split_chart();
                            // make_current_months_daily_transactions_value_chart();
                            // make_current_months_daily_transactions_value_split_chart();

                            var scroll = new SmoothScroll('a[href*="#"]', {
                                speed: 10
                            });
                        } else {
                            $('#charts').show();
                            chart0.data = {
                                labels: current_months_dates,
                                datasets: current_month_daily_transaction_count_data
                            };
                            chart0.options.title.text = 'Daily Listing Count [' + selected_month.display + ']';
                            chart0.update();



                            chart1.data = {
                                labels: current_months_dates,
                                datasets: current_month_daily_transaction_count_split_data
                            }
                            chart1.options.title.text = 'Daily Approval Count [' + selected_month.display + ']';
                            chart1.update();


                            chart10.data = {
                                labels: current_months_dates,
                                datasets: current_month_daily_seller_count_data
                            }
                            chart10.options.title.text = 'Daily Unique Seller Count [' + selected_month.display + ']';
                            chart10.update();



                            $("#city_table_header").text("City Wise Sellers [" + selected_month.display + "]");
                            city_datatable.clear();
                            city_datatable.rows.add(city_table_html);
                            city_datatable.draw(true);


                            $("#cat_table_header").text("Category Wise Seller [" + selected_month.display + "]");
                            cat_datatable.clear();
                            cat_datatable.rows.add(cat_table_html);
                            cat_datatable.draw(true);

                            chart11.data = {
                                labels: current_months_dates,
                                datasets: current_month_daily_promotion_amount
                            };
                            chart11.options.title.text = 'Promoted Listings Value [' + selected_month.display + ']';
                            chart11.update();

                            chart12.data = {
                                labels: current_months_dates,
                                datasets: current_month_daily_promotion_seller_count
                            };
                            chart12.options.title.text = 'Promoted Listings -Seller Count [' + selected_month.display + ']',
                                chart12.update();
                        }
                        break;
                    }
            }
        },
        data: JSON.stringify(data)
    });
}


var current_month_daily_transaction_count_data = [],
    current_month_daily_transaction_count_data_received = {};

function make_current_months_daily_transactions_chart() {
    chart0 = new Chart(document.getElementById("current-months-daily-transaction-chart"), {
        type: 'line',
        data: {
            labels: current_months_dates,
            datasets: current_month_daily_transaction_count_data
        },
        options: {
            tooltips: {
                mode: 'index'
            },
            title: {
                display: true,
                text: 'Daily Listing Count [' + selected_month.display + ']',
                fontSize: 20,
                position: 'top',
                fontFamily: 'Lato'
            }
        }
    });
}

var current_month_daily_seller_count_data = [],
    current_month_daily_seller_count_data_received = {};
var chart10;

function make_current_months_daily_sellers_chart() {
    chart10 = new Chart(document.getElementById("current-months-daily-seller-count"), {
        type: 'line',
        data: {
            labels: current_months_dates,
            datasets: current_month_daily_seller_count_data
        },
        options: {
            tooltips: {
                mode: 'index'
            },
            title: {
                display: true,
                text: 'Daily Unique Seller Count [' + selected_month.display + ']',
                fontSize: 20,
                position: 'top',
                fontFamily: 'Lato'
            }
        }
    });
}

var current_month_daily_promotion_amount = [],
    current_month_daily_promotion_amount_data_received = [];
var chart11;

function make_current_months_daily_promtions_amount_chart() {
    chart11 = new Chart(document.getElementById("promotions-amount-chart"), {
        type: 'line',
        data: {
            labels: current_months_dates,
            datasets: current_month_daily_promotion_amount
        },
        options: {
            tooltips: {
                mode: 'index'
            },
            title: {
                display: true,
                text: 'Promoted Listings Value [' + selected_month.display + ']',
                fontSize: 20,
                position: 'top',
                fontFamily: 'Lato'
            }
        }
    });
}



var current_month_daily_promotion_seller_count = [],
    current_month_daily_promotion_seller_count_data_received = [];
var chart12;

function make_current_months_daily_promtions_seller_count_chart() {
    chart12 = new Chart(document.getElementById("promotions-count-chart"), {
        type: 'line',
        data: {
            labels: current_months_dates,
            datasets: current_month_daily_promotion_seller_count
        },
        options: {
            tooltips: {
                mode: 'index'
            },
            title: {
                display: true,
                text: 'Promoted Listings -Seller Count [' + selected_month.display + ']',
                fontSize: 20,
                position: 'top',
                fontFamily: 'Lato'
            }
        }
    });
}


var current_month_daily_transaction_count_split_data = [],
    current_month_daily_transaction_count_split_data_received = {};

function make_current_months_daily_transactions_with_split_chart() {
    chart1 = new Chart(document.getElementById("current-months-daily-transaction-chart-with-split"), {
        type: 'line',
        data: {
            labels: current_months_dates,
            datasets: current_month_daily_transaction_count_split_data
        },
        options: {
            tooltips: {
                mode: 'index'
            },
            title: {
                display: true,
                text: 'Daily Listing Count with Sub-Divisions [' + selected_month.display + ']',
                fontSize: 20,
                position: 'top',
                fontFamily: 'Lato'
            }
        }
    });
}


var current_month_daily_transaction_count__status_split_data = [],
    current_month_daily_transaction_count_status_split_data_received = {};

function make_current_months_daily_transactions_with_status_split_chart() {
    chart2 = new Chart(document.getElementById("current-months-daily-transaction-chart-with-status-split"), {
        type: 'line',
        data: {
            labels: current_months_dates,
            datasets: current_month_daily_transaction_count__status_split_data
        },
        options: {
            tooltips: {
                mode: 'index'
            },
            title: {
                display: true,
                text: 'Total Order Count With Order Status [' + selected_month.display + ']',
                fontSize: 20,
                position: 'top',
                fontFamily: 'Lato'
            }
        }
    });
}


var cancellations_returns_chart_data;

function make_cancellation_and_return_chart() {
    var ctx = document.getElementById('cancellations-and-return-chart').getContext('2d');
    chart3 = new Chart(ctx, {
        type: 'bar',
        data: cancellations_returns_chart_data,
        options: {
            title: {
                display: true,
                text: 'Cancellation & Returns [' + selected_month.display + ']',
                fontSize: 20,
                fontFamily: 'Lato'
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
}


var current_month_daily_transaction_value_data = [],
    current_month_daily_transaction_value_data_received;

function make_current_months_daily_transactions_value_chart() {
    chart4 = new Chart(document.getElementById("current-months-daily-transaction-chart-value"), {
        type: 'line',
        data: {
            labels: current_months_dates,
            datasets: current_month_daily_transaction_value_data
        },
        options: {
            tooltips: {
                mode: 'index'
            },
            title: {
                display: true,
                text: 'Daily Order Value [' + selected_month.display + ']',
                fontSize: 20,
                position: 'top',
                fontFamily: 'Lato'
            }
        }
    });
}



var current_month_daily_transaction_value_split_data = [],
    current_month_daily_transaction_value_split_data_received;

function make_current_months_daily_transactions_value_split_chart() {
    chart5 = new Chart(document.getElementById("current-months-daily-transaction-chart-value-split"), {
        type: 'line',
        data: {
            labels: current_months_dates,
            datasets: current_month_daily_transaction_value_split_data
        },
        options: {
            tooltips: {
                mode: 'index'
            },
            title: {
                display: true,
                text: 'Daily Order Value Sub-Divisions [' + selected_month.display + ']',
                fontSize: 20,
                position: 'top',
                fontFamily: 'Lato'
            }
        }
    });
}



var city_table_html = [];
var city_datatable;

function make_city_wise_split_chart() {
    //console.log(city_table_html);
    $("#city_table_header").text("City Wise Sellers [" + selected_month.display + "]");

    city_datatable = $('#city_table').DataTable({
        data: (city_table_html),
        columns: [
            { title: "City" },
            { title: "City Id" },
            { title: "Sellers" }
        ]
    });
}


var cat_table_html = [];
var cat_datatable;

function create_category_split_chart() {
    //console.log(cat_table_html);
    $("#cat_table_header").text("Category Wise Sellers [" + selected_month.display + "]");

    cat_datatable = $('#category_table').DataTable({
        data: (cat_table_html),
        columns: [
            { title: "Category" },
            { title: "Sellers" }
        ]
    });
}


function make_last_six_months_orders_chart() {
    var months = ["Jan 19", "Feb 19", "Mar 19", "Apr 19", "May 19"];
    new Chart(document.getElementById("last-six-months-orders-chart"), {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                data: [1569, 1192, 1335, 1452, 709],
                label: "Products Sold",
                borderColor: "#3e95cd",
                fill: false
            }, {
                data: [16721, 17239, 20244, 2149, 2478],
                label: "Cart Additions",
                borderColor: "#ff4757",
                fill: false
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Last 6 Months [Transaction Counts]',
                fontSize: 20,
                position: 'top',
                fontFamily: 'Lato'
            },
            tooltips: {

                mode: 'index'
            },
            legend: {
                position: 'bottom',
                fillStyle: 'color'
            }
        }
    });
}


function make_last_six_months_gmv_chart() {
    var months = ["Jan 19", "Feb 19", "Mar 19", "Apr 19", "May 19"];
    new Chart(document.getElementById("last-six-monthly-gmv-chart"), {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                data: [8315126, 9104883, 12470615, 11393295, 14512379],
                label: "Products Sold",
                borderColor: "#3e95cd",
                fill: true
            }, {
                data: [1256003, 907041, 979966, 1043652, 473601],
                label: "Cart Additions",
                borderColor: "#ff4757",
                fill: true
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Last 6 Months [ GMV ]',
                fontSize: 18,
                position: 'top',
                fontFamily: 'Lato'
            },
            tooltips: {

                mode: 'index'
            },
            legend: {
                position: 'bottom',
                fillStyle: 'color'
            }
        }
    });
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    console.log(color);
    return color;
}


var payment_mode_split = [];

function make_payment_mode_split_chart() {
    var ctx = document.getElementById('payment-mode-split-chart').getContext('2d');
    var config = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: payment_mode_split,
                backgroundColor: ["#ffcb23", "#624af9"],
                label: 'payment_mode-split'
            }],
            labels: [
                'Online Percentage', "COD Percentage"
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Online Vs Cod Order Split [' + selected_month.display + ']',
                fontSize: 20,
                position: 'top',
                fontFamily: 'Lato'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    };

    chart6 = new Chart(ctx, config);

}

var payment_mode_split_citywise_data = [];

function make_payment_mode_split_citywise_data_chart() {
    var ctx = document.getElementById('paymentmode-city-wise-split-chart').getContext('2d');
    chart7 = new Chart(ctx, {
        type: 'bar',
        data: payment_mode_split_citywise_data,
        options: {
            title: {
                display: true,
                text: 'Payment Mode Split City Wise [' + selected_month.display + ']',
                fontSize: 20,
                fontFamily: 'Lato'
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                    display: false
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
}

var payment_mode_split_genderwise_data = [];

function make_payment_mode_split_genderwise_data_chart() {
    var ctx = document.getElementById('paymentmode-gender-wise-split-chart').getContext('2d');
    chart8 = new Chart(ctx, {
        type: 'bar',
        data: payment_mode_split_genderwise_data,
        options: {
            title: {
                display: true,
                text: 'Payment Mode Split Gender Wise [' + selected_month.display + ']',
                fontSize: 20,
                fontFamily: 'Lato'
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                    maxBarThickness: 70

                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
}

function change_current_month_daily_transaction_month() {
    selected_month = all_months[($(".month_select")[0].selectedIndex) - 1];
    $('#charts').hide();
    get_data("http://dev-gtw1.coutloot.com:4001/transactions/getMonthAmounts", selected_month, 0);
}