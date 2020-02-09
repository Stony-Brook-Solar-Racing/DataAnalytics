console.log("This is my life");

console.log($("#textforspeed"));

setInterval(function() {
  console.log("WHATUP");
  jQuery.get("./retrievedata", function(data){
    console.log(data.velocity);
    $("#textforSpeed").html("Speed: " + data.velocity);
  });
}, 1000);
