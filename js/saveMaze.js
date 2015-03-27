$(document).ready(function () {
	console.log("ready!");
	$("#saveMaze").click(function () {
		var mazeAsText = $("#enteredMaze").val();
		var entranceAsText = $("#entrance").val();
		var rows = mazeAsText.split("\n");
		var mazeArray = [];
		var temp = [];

		
		// transforming entered string to array of inegers
		for (var i=0; i<rows.length; i++) {
			var k = rows[i].split("");
			for (var j=0; j<k.length; j++) {
				temp.push(parseInt(k[j]));
			}
			mazeArray.push(temp);
			temp = [];
		}

		// transforming entered entrance coords to array of integers
		var splitedCoords = entranceAsText.split(",");
		var entranceArray = [parseInt(splitedCoords[0]), parseInt(splitedCoords[1])];

		console.log(mazeArray);
		console.log(entranceArray);

		objectToSend = {
			maze: mazeArray,
			entrance: entranceArray
		};

		var jsonToSend = JSON.stringify(objectToSend);

		$.ajax({
		url: "/maze",
		method: "PUT", 
		data: jsonToSend,
		dataType: 'json'
		}).done(function (data, textStatus, jqXHR) { // textStatus == success
			alert("Data Saved: " + data);
			alert(textStatus);
			alert(jqXHR);
		}).fail(function (jqXHR, textStatus, errorThrown) { // textStatus == error
			alert("Fail " + jqXHR);
			alert(textStatus);
			alert(errorThrown);
		});	
	});	
})


