$(document).ready(function () {
	console.log("ready!");
	$("#saveMaze").click(function () {
		var mazeArray = [];
		var temp = [];

		// new
		var i, j, dimension, id;
		dimension = parseInt($("#selectDimension").val());
		for (i=0; i<dimension; i++) {
			for (j=0; j<dimension; j++) {
				id = "#field" + String(i) + String(j);
				temp.push(parseInt($(id).find("span").text()));
			}
			mazeArray.push(temp);
			temp = [];
		}

		var entranceArray = [parseInt($("#entranceRow").val()), 
							 parseInt($("#entranceCol").val())];

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

	function drawMaze (dimension) {
		var i, j, content, id, option;
		$("#maze").empty();
		for (i=0; i<dimension; i++) {
			content = ""
			content += "<div>";
			for (j=0; j<dimension; j++) {
				id = "id='field" + String(i) + String(j) +"'"
				content += "<div " + id + " class='box box-one'><span class='field-value'>1</span></div>";
			}
			content += "</div>";
			$('#maze').append(content);
		}	

		// event for clicking field of maze - changing field meaning
		$(".box").click(function () {
			if ($(this).hasClass('box-one')) {
				$(this).removeClass('box-one').addClass('box-zero');
				$(this).find("span").text("0");
			} else {
				$(this).removeClass('box-zero').addClass('box-one');
				$(this).find("span").text("1");
			}
		});

		// changing possible entrance coords acording to maze dimension
		$("#entranceRow").empty();
		$("#entranceCol").empty();
		for (i=0; i<dimension; i++) {
			option = $("<option></option>").text(i+1);
			option.attr({
				"value": i
			});
			$("#entranceRow").append(option);

			option = $("<option></option>").text(i+1);
			option.attr({
				"value": i
			});
			$("#entranceCol").append(option);
		}

	};

	(function () {
		var i, option;
		for (i=3; i<11; i++) {
			option= $("<option></option>").text(i);
			option.attr({
				"value": i
			})
			$("#selectDimension").append(option);
		}
	})();

	$("#selectDimension").change(function () {
		var dimension = parseInt($("#selectDimension").val());
		drawMaze(dimension);
	});

	drawMaze(3);

})


