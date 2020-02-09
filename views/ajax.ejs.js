$("#something").html("hello");
window.setInterval(function(){
	$.get("velocityUpdate", function(data, status){
		console.log(data);
		$("#something").html(data);
	}), 2000
});