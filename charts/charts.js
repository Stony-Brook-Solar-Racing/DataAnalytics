
var ctx = document.getElementById('myChart').getContext('2d');
var updateButton = document.getElementById('update');


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
    return parseInt(Math.random(0,500) * 100)
}


var update = function() {
    chart.data.labels.push(randomNumbers());
    chart.data.datasets[0].data.push(randomNumbers());
    chart.update();
}

updateButton.addEventListener('click', update)

setInterval(update, 3000)
