setInterval(function() {
  jQuery.get("./retrievedata", function(data){
    console.log(data.velocity);
      $("#textforSpeed").html("Speed: " + data.velocity);
      $("#textforBattery").html("Battery: " + data.battery);
      $("#textforWater").html("Water Level: " + data.waterlevel);
  });
}, 1000);
