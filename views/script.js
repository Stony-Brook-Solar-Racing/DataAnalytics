console.log("Hello");

window.setInterval(function(){
	console.log(data);
	$.get("velocityUpdate", function(data, status){
		console.log("hello");
		$("#something").html(data);
		$("#something").html("hello");
	}, timeout:1000), 2000
});