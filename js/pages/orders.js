var all_months;
var selected_month;
var loaded = 0;

var chart0, chart1, chart2, chart3, chart4, chart5, chart6, chart7, chart8, chart9;
var current_months_dates = [];


$(document).ready(function() {
    $('#example').DataTable();
    /*
    setup_dropdown();
    $('#charts').hide();
    get_data("http://dev-gtw1.coutloot.com:4001/users/getMonthAllUsers", selected_month, 0);
    */
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

            console.log("Type : " + type);
            switch (type) {

                case -1:
                    {
                        break;
                    }

                case 0:
                    {
                        //user registration
                        var data_received = data.data;
                        current_months_dates = [];
                        current_month_daily_transaction_count_data_received = [];
                        current_month_daily_transaction_value_data_received = [];

                        for (var i = 0; i < data_received.length; i++) {
                            current_months_dates.push(data_received[i].registered_date);
                            current_month_daily_transaction_count_data_received.push(data_received[i].registered_users);
                        }

                        current_month_daily_transaction_count_data = [{
                            data: current_month_daily_transaction_count_data_received,
                            label: "Total Users Registered",
                            borderColor: "#8e44ad",
                            fill: false
                        }];

                        console.log(current_month_daily_transaction_count_data);

                        current_month_daily_transaction_value_data = [{
                            data: current_month_daily_transaction_value_data_received,
                            label: "Value Of Products Sold",
                            borderColor: "#3e95cd",
                            fill: false
                        }];

                        //console.log(current_month_daily_transaction_count_data);
                        //console.log(current_month_daily_transaction_value_data);

                        get_data("http://dev-gtw1.coutloot.com:4001/users/getMonthCityUsers", selected_month, 4);
                        break;
                    }

                case 1:
                    {
                        var data_received = data.data;
                        current_month_daily_transaction_count_split_data_received = {};
                        var meet_and_buy = [],
                            ship_via_coutloot = [];
                        for (var i = 0; i < data_received.length; i++) {
                            meet_and_buy.push(data_received[i].cp);
                            ship_via_coutloot.push((data_received[i].dl) + (data_received[i].ss));
                        }
                        current_month_daily_transaction_count_split_data_received.total = (current_month_daily_transaction_count_data_received);
                        current_month_daily_transaction_count_split_data_received.meet_and_buy = meet_and_buy;
                        current_month_daily_transaction_count_split_data_received.ship_via_coutloot = ship_via_coutloot;

                        current_month_daily_transaction_count_split_data = [{
                            data: current_month_daily_transaction_count_split_data_received.total,
                            label: "Total Products Sold",
                            borderColor: "#3e95cd",
                            fill: false
                        }, {
                            data: current_month_daily_transaction_count_split_data_received.meet_and_buy,
                            label: "Via Meet & Buy",
                            borderColor: "#f39c12",
                            fill: false
                        }, {
                            data: current_month_daily_transaction_count_split_data_received.ship_via_coutloot,
                            label: "Ship Via Coutloot",
                            borderColor: "#e74c3c",
                            fill: false
                        }];

                        console.log(current_month_daily_transaction_count_split_data);
                        get_data("http://dev-gtw1.coutloot.com:4001/transactions/getMonthAllOrderStatuses", selected_month, 2);
                        break;
                    }

                case 2:
                    {
                        var data_received = data.data;
                        var buyer_male,
                            buyer_female;
                        for (var i = 0; i < data_received.length; i++) {
                            //console.log(data_received[i]);
                            if (data_received[i].user_gender == "MALE") {
                                console.log("Male Data Found");
                                buyer_male = (data_received[i].buyers);
                            }


                            if (data_received[i].user_gender == "FEMALE") {
                                //console.log("Female Data Found");
                                buyer_female = (data_received[i].buyers);
                            }
                        }

                        buyer_gender_split = [(buyer_male * 100 / (buyer_female + buyer_male)).toFixed(2), (buyer_female * 100 / (buyer_female + buyer_male)).toFixed(2)];


                        get_data("http://dev-gtw1.coutloot.com:4001/users/getMonthGenderSellers", selected_month, 8);
                        break;

                        /*
                        current_month_daily_transaction_count_status_split_data_received.placed = placed;
                        current_month_daily_transaction_count_status_split_data_received.confirmed = confirmed;
                        current_month_daily_transaction_count_status_split_data_received.scheduled = scheduled;
                        current_month_daily_transaction_count_status_split_data_received.picked_up = picked_up;
                        current_month_daily_transaction_count_status_split_data_received.ready_to_ship = ready_to_ship;
                        current_month_daily_transaction_count_status_split_data_received.shipped = shipped;
                        current_month_daily_transaction_count_status_split_data_received.delivered = delivered;

                        current_month_daily_transaction_count__status_split_data = [{
                            data: current_month_daily_transaction_count_status_split_data_received.placed,
                            label: "Booked.",
                            borderColor: "#3e95cd",
                            fill: false
                        }, {
                            data: current_month_daily_transaction_count_status_split_data_received.confirmed,
                            label: "Confirmed",
                            borderColor: "#f39c12",
                            fill: false
                        }, {
                            data: current_month_daily_transaction_count_status_split_data_received.scheduled,
                            label: "Pick Up Scheduled",
                            borderColor: "#ee5253",
                            fill: false
                        }, {
                            data: current_month_daily_transaction_count_status_split_data_received.picked_up,
                            label: "Picked Up",
                            borderColor: "#8395a7",
                            fill: false
                        }, {
                            data: current_month_daily_transaction_count_status_split_data_received.ready_to_ship,
                            label: "Ready To Ship",
                            borderColor: "#341f97",
                            fill: false
                        }, {
                            data: current_month_daily_transaction_count_status_split_data_received.shipped,
                            label: "Shipped",
                            borderColor: "#f368e0",
                            fill: false
                        }, {
                            data: current_month_daily_transaction_count_status_split_data_received.delivered,
                            label: "Delivered",
                            borderColor: "#10ac84",
                            fill: false
                        }];

                        var reduced_cancellation = [];
                        for (var i = 0; i < current_month_daily_transaction_count_data_received.length; i++) {
                            reduced_cancellation.push(current_month_daily_transaction_count_data_received[i] - cancelled[i] - returned[i]);
                        }
                        */
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
                        var total_products = 0;
                        var total_value = 0;
                        for (var i = 0; i < data_received.length; i++) {
                            total_products = total_products + data_received[i].total_products;
                            total_value = total_value + data_received[i].total_amount;
                        }

                        city_table_html = [];
                        for (var i = 0; i < data_received.length; i++) {
                            var cell = [];
                            cell.push(data_received[i].cityId);
                            cell.push(data_received[i].city);
                            cell.push(data_received[i].registered_users);
                            //cell.push(data_received[i].total_products);
                            //cell.push((Number((data_received[i].total_products * 100) / total_products)).toFixed(2));
                            //cell.push(data_received[i].total_amount);
                            //cell.push((Number((data_received[i].total_amount * 100 / total_value))).toFixed(2));

                            city_table_html.push(cell);
                        }

                        get_data("http://dev-gtw1.coutloot.com:4001/users/getMonthGenderUsers", selected_month, 6);
                        break;
                    }

                case 5:
                    {
                        var data_received = data.data;
                        var total_products = 0;
                        var total_value = 0;
                        for (var i = 0; i < data_received.length; i++) {
                            total_products = total_products + data_received[i].total_products;
                            total_value = total_value + data_received[i].total_amount;
                        }

                        cat_table_html = [];
                        for (var i = 0; i < data_received.length; i++) {
                            var cell = [];
                            cell.push(data_received[i].categoryString);
                            cell.push(data_received[i].newCategoryId);
                            cell.push(data_received[i].total_products);
                            cell.push((Number((data_received[i].total_products * 100) / total_products)).toFixed(2));
                            cell.push(data_received[i].total_amount);
                            cell.push((Number((data_received[i].total_amount * 100 / total_value))).toFixed(2));

                            cat_table_html.push(cell);
                        }

                        get_data("http://dev-gtw1.coutloot.com:4001/transactions/getMonthCodSplit", selected_month, 6);
                        break;
                    }

                case 6:
                    {
                        var data_received = data.data;
                        var online_sum = 0;
                        var men_object = {};
                        var women_object = {};

                        data_received.forEach(element => {
                            online_sum = online_sum + element.registered_users;
                            if (element.user_gender == "MALE") {
                                men_object = element;
                            } else if (element.user_gender == "FEMALE") {
                                women_object = element;
                            }
                        });


                        payment_mode_split = [(men_object.registered_users * 100 / (online_sum)).toFixed(2), (women_object.registered_users * 100 / (online_sum)).toFixed(2)];

                        console.log(payment_mode_split);
                        get_data("http://dev-gtw1.coutloot.com:4001/users/getMonthGenderBuyers", selected_month, 2);
                        break;

                    }

                case 7:
                    {

                        //male vs female users

                        var data_received = data.data;
                        var cities = [],
                            online = [],
                            cod = [];

                        data_received.forEach(element => {
                            cities.push(element.city);
                            online.push(((element.online_orders * 100) / (element.cod_orders + element.online_orders)));
                            cod.push(((element.cod_orders * 100) / (element.cod_orders + element.online_orders)));
                        });

                        payment_mode_split = {
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

                        //console.log(payment_mode_split);
                        get_data("http://dev-gtw1.coutloot.com:4001/users/getMonthGenderBuyers", selected_month, 8);
                        break;
                    }

                case 8:
                    {
                        var data_received = data.data;
                        var seller_male,
                            seller_female;
                        for (var i = 0; i < data_received.length; i++) {
                            //console.log(data_received[i]);
                            if (data_received[i].user_gender == "MALE") {
                                //console.log("Male Data Found");
                                seller_male = (data_received[i].sellers);
                            }


                            if (data_received[i].user_gender == "FEMALE") {
                                //console.log("Female Data Found");
                                seller_female = (data_received[i].sellers);
                            }
                        }

                        seller_gender_split = [(seller_male * 100 / (seller_female + seller_male)).toFixed(2), (seller_female * 100 / (seller_female + seller_male)).toFixed(2)];

                        get_data("http://dev-gtw1.coutloot.com:4001/users/getMonthChats", selected_month, 9);
                        break;
                    }

                case 9:
                    {

                        var data_received = data.data;
                        current_month_daily_chat_data_received = [];
                        for (var i = 0; i < data_received.length; i++) {
                            current_month_daily_chat_data_received.push(data_received[i].chats);
                        }

                        current_month_daily_chat_data = [{
                            data: current_month_daily_chat_data_received,
                            label: "Chat Count : ",
                            borderColor: "#8e44ad",
                            fill: false
                        }];

                        console.log(current_month_daily_chat_data);

                        if (loaded == 0) {
                            $('#charts').show();
                            loaded = 1;
                            make_current_months_daily_transactions_chart();
                            make_city_wise_split_chart();
                            make_payment_mode_split_chart();
                            make_buyer_gender_split_chart();
                            make_seller_gender_split_chart();
                            make_current_months_daily_chat_chart();
                            //make_current_months_daily_transactions_with_split_chart();
                            //make_current_months_daily_transactions_with_status_split_chart();
                            //make_current_months_daily_transactions_value_chart();
                            //make_current_months_daily_transactions_value_split_chart();
                            //create_category_split_chart();
                            //make_payment_mode_split_citywise_data_chart();
                            //make_payment_mode_split_genderwise_data_chart();
                            var scroll = new SmoothScroll('a[href*="#"]', {
                                speed: 10
                            });
                        } else {
                            $('#charts').show();


                            chart0.data = {
                                labels: current_months_dates,
                                datasets: current_month_daily_transaction_count_data
                            };
                            chart0.options.title.text = 'Daily Order Count [' + selected_month.display + ']';
                            chart0.update();


                            $("#city_table_header").text("City Wise Registerations [" + selected_month.display + "]");
                            city_datatable.clear();
                            city_datatable.rows.add(city_table_html);
                            city_datatable.draw(true);


                            chart6.data = {
                                labels: ['Male Percentage', "Female Percentage"],
                                datasets: [{
                                    data: payment_mode_split,
                                    backgroundColor: ["#ffcb23", "#624af9"],
                                    label: 'payment_mode-split'
                                }]
                            };
                            chart6.options.title.text = 'Registeration Split Gender Wise  [' + selected_month.display + ']';
                            chart6.update();


                            chart8.data = {
                                datasets: [{
                                    data: buyer_gender_split,
                                    backgroundColor: ["#5f27cd", "#ff6b6b"],
                                    label: 'payment_mode-split'
                                }],
                                labels: [
                                    'Male Buyers', "Female Buyers"
                                ]
                            };
                            chart8.options.title.text = 'Payment Mode - Gender Wise Split [' + selected_month.display + ']';
                            chart8.update();


                            chart9.data = {
                                labels: current_months_dates,
                                datasets: current_month_daily_chat_data
                            };
                            chart9.options.title.text = 'Daily Chat-Heads Count [' + selected_month.display + ']'
                            chart9.update();
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
    console.log(current_month_daily_transaction_count_data);
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
                text: 'Daily Registered Count [' + selected_month.display + ']',
                fontSize: 20,
                position: 'top',
                fontFamily: 'Lato'
            }
        }
    });
}



var current_month_daily_chat_data = [],
    current_month_daily_chat_data_received = {};

function make_current_months_daily_chat_chart() {

    chart9 = new Chart(document.getElementById("no-of-chats-chart"), {
        type: 'line',
        data: {
            labels: current_months_dates,
            datasets: current_month_daily_chat_data
        },
        options: {
            tooltips: {
                mode: 'index'
            },
            title: {
                display: true,
                text: 'Daily Chat-Heads Count [' + selected_month.display + ']',
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
                text: 'Daily Order Count with Sub-Divisions [' + selected_month.display + ']',
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
                text: 'Buyer Seller Profile - Gender Wise [' + selected_month.display + ']',
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
    $("#city_table_header").text("City Wise Registerations [" + selected_month.display + "]");

    city_datatable = $('#city_table').DataTable({
        data: (city_table_html),
        columns: [
            { title: "City Id" },
            { title: "City" },
            { title: "Resgistrations" }
        ]
    });
}


var cat_table_html = [];
var cat_datatable;

function create_category_split_chart() {
    //console.log(cat_table_html);
    $("#cat_table_header").text("Category Wise Transactions [" + selected_month.display + "]");

    cat_datatable = $('#category_table').DataTable({
        data: (cat_table_html),
        columns: [
            { title: "Category" },
            { title: "Cat Id" },
            { title: "Transactions" },
            { title: "Transaction Percent" },
            { title: "Value Of Trans" },
            { title: "Value Percent" }
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
                'Male Users', "Female Users"
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Registeration Split Gender Wise [' + selected_month.display + ']',
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

var buyer_gender_split = [];

function make_buyer_gender_split_chart() {
    var ctx = document.getElementById('buyer-gender-split-chart').getContext('2d');
    var config = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: buyer_gender_split,
                backgroundColor: ["#5f27cd", "#ff6b6b"],
                label: 'payment_mode-split'
            }],
            labels: [
                'Male Buyers', "Female Buyers"
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Buyer Split Gender Wise [' + selected_month.display + ']',
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

    chart8 = new Chart(ctx, config);

}



var seller_gender_split = [];

function make_seller_gender_split_chart() {
    var ctx = document.getElementById('seller-gender-split-chart').getContext('2d');
    var config = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: seller_gender_split,
                backgroundColor: ["#006266", "#9980FA"],
                label: 'payment_mode-split'
            }],
            labels: [
                'Male Sellers', "Female Sellers"
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Seller Split Gender Wise [' + selected_month.display + ']',
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

    chart9 = new Chart(ctx, config);

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
    chart7 = new Chart(ctx, {
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


// $(document).ready(function (){
//     var table = $('#example_pack').DataTable({
//        'ajax': 'https://api.myjson.com/bins/sh72r',
//        'orderFixed': [4, 'asc'],
//        'rowGroup': {
//           'dataSrc': 'office',
//           'startRender': function(rows, group) {
//              // Assign class name to all child rows
//              var groupName = 'group-' + group.replace(/[^A-Za-z0-9]/g, '');
//              var rowNodes = rows.nodes();
//              rowNodes.to$().addClass(groupName);
             
//              // Get selected checkboxes
//             //  var checkboxesSelected = $('.dt-checkboxes:checked', rowNodes);
             
//             //  // Parent checkbox is selected when all child checkboxes are selected
//             //  var isSelected = (checkboxesSelected.length == rowNodes.length);
             
//               return '<label> ' + group + ' (' + rows.count() + ')</label>';
//           }         
//        },
//        'columns': [
//           { 'data': 'first_name' },
//           { 'data': 'last_name' },
//           { 'data': 'position' },
//           { 'data': 'office' },
//           { 'data': 'salary' }
//        ],
//        'order': [[3, 'asc']]
//     } );
      
//     // Handle click event on group checkbox
//     // $('#example_pack').on('click', '.group-checkbox', function(e){
//     //    // Get group class name
//     //    var groupName = $(this).data('group-name');
       
//     //    // Select all child rows
//     //    table.cells('tr.' + groupName, 0).checkboxes.select(this.checked);
//     // });
 
//     // // Handle click event on "Select all" checkbox
//     // $('#example_pack').on('click', 'thead .dt-checkboxes-select-all', function(e){
//     //    var $selectAll = $('input[type="checkbox"]', this);      
//     //    setTimeout(function(){
//     //       // Select group checkbox based on "Select all" checkbox state
//     //       $('.group-checkbox').prop('checked', $selectAll.prop('checked'));
//     //    }, 0);
//     // });     
 
//  } ); 