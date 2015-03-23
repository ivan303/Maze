$(document).ready(function () {
	console.log("ready!");
	$("#saveMaze").click(function () {
		$.ajax({
		url: "/maze",
		method: "POST", 
		data: {name: "John", location: "Boston"}
		}).done(function (msg) {
			alert("Data Saved: " + msg);
		});	
	});	
})

