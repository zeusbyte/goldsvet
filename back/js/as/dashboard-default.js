as.dashboard = {};

as.dashboard.initChart = function () {
    var data = {
        labels: labels,
        datasets: [
            {
                label: trans.chartLabel,
                backgroundColor: "transparent",
                borderColor: "#179970",
                pointBackgroundColor: "#179970",
                data: activities
            }
        ]
    };

    var ctx = document.getElementById("myChart").getContext("2d");
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "#f6f6f6",
                        zeroLineColor: '#f6f6f6',
                        drawBorder: false
                    },
                    ticks: {
                        beginAtZero: true,
                        callback: function(value) {if (value % 1 === 0) {return value;}}
                    }
                }]
            },
            responsive: true,
            legend: {
                display: false
            },
            maintainAspectRatio: false,
            tooltips: {
                titleMarginBottom: 15,
                callbacks: {
                    label: function(tooltipItem, data) {
                        var value = tooltipItem.yLabel,
                            suffix = value == 1 ? trans.action : trans.actions;

                        return " " + value + " " + suffix;
                    }
                }
            }
        }
    })
};

$(document).ready(function () {
    as.dashboard.initChart();
});