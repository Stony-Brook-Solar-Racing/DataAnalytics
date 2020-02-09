
var ctx = document.getElementById('myChart').getContext('2d');


var xlabels = ["Time"]
var ylabels = [0]

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: xlabels,
        datasets: [{
            label: 'Speed over Time',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: ylabels
        }]
    },

    // Configuration options go here
    options: {}
});

var randomNumbers = function() {
    return parseInt(Math.random(0,500) * 100);
}


var update = function() {
    var x  = randomNumbers();
    var y = randomNumbers();
    xlabels.push(x);
    ylabels.push(y);
    /*chart.data.labels.push(x);
    chart.data.datasets[0].data.push(y);*/
    if (xlabels.length > 10) {
        xlabels.shift();
        ylabels.shift();
    };
    chart.update();
}


setInterval(update, 3000)
