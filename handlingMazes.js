// array of objects { maze: object, id: int }
// maze = { structure: , entrance: , exit: }
// during adding maze exits coords will be remembered as entrance coords
var mazes = [],
	nextMazeIndex = 0;

function addMaze (maze, entrance) {
	
	// check if maze is a square
	var numOfRows = maze.length;
	for (var i = 0; i<numOfRows; i++) {
		if (numOfRows != numOfRows[i].length) {
			// maze isn't a square
			//...
		}
	}

	// check if maze has minimum size: 3
	if (numOfRows < 3) {
		// maze is too small
	}

	// check if maze consists only with zeros and ones
	for (var i=0; i<numOfRows; i++) {
		for (var j=0; j<numOfRows; j++) {
			if (maze[i][j] != 0 && maze[i][j] != 1) {
				// maze dosn't consists only with zeros and ones
			}
		}
	}


	// checking if maze is valid
	// we assume that there are only two fileds on external walls with 0 - entrance and exit
	// they can't be corners of maze and can't be connected directly
	// it must be at least one way from entrance to exit 
	// there may not be chambers - four fields with zeros making squere
	// there may not be cycles (loops) in maze

	// check if entrance coords has value 0 in maze
	if (maze[entrance[0]][entrance[1]] == 1) {
		// entrance isn't 0
	}

	// check if entrance is on external walls excluding corners
	if (entrance[0] == 0 || entrance[0] == numOfRows-1) {
		if (entrance[1] == 0 || entrance[1] == numOfRows-1) {
			// entrance in corner
		}
	} else if (entrance[1] == 0 || entrance[1] == numOfRows-1) {
		if (entrance[0] == 0 || entrance[0] == numOfRows-1) {
			// entrance in corner
		}
	} else {
		// entrance inside maze
	}

	// check fields on external walls - two zeros
	var numOfZerosOnExWalls = 0;
	var exit = [];
	for (var i=0; i<numOfRows; i++) {
		if (i == 0 || i == numOfRows-1) { // up and down of maze
			for (var j=0; j<numOfRows; j++) {
				if (maze[i][j] == 0) {
					numOfZerosOnExWalls++;
					if (i != entrance[0] || j != entrance[1]) { // potential exit
						exit.push(i);
						exit.push(j);
					}
				}
			}
		} else { 
			if (maze[i][0] == 0) {
				numOfZerosOnExWalls++;
				if (i != entrance[0] || 0 != entrance[1]) {
					exit.push(i);
					exit.push(j);
				}
			}
			if (maze[i][numOfRows-1] == 0) {
				numOfZerosOnExWalls++;
				if (i != entrance[0] || numOfRows-1 != entrance[1]) {
					exit.push(i);
					exit.push(j);
				}
			}
		}
	}

	if (numOfZerosOnExWalls != 2) {
		// zeros on external wall not equal to 2
	}

	// check if exit is on external walls excluding corners
	if (exit[0] == 0 || exit[0] == numOfRows-1) {
		if (exit[1] == 0 || exit[1] == numOfRows-1) {
			// exit in corner
		}
	} else if (exit[1] == 0 || exit[1] == numOfRows-1) {
		if (exit[0] == 0 || exit[0] == numOfRows-1) {
			// exit in corner
		}
	} else {
		// exit inside maze
	}

	// check if entrance and exit aren't connected directly
	if (entrance[0] == exit[0]) {
		if (entrance[1]+1 == exit[1] || entrance[1] == exit[1]+1) {
			// directly connected
		}
	} else if (entrance[1] == exit[1]) {
		if (entrance[0]+1 == exit[0] || entrance[0] == exit[0]+1) {
			// directly connected
		}
	}

	// check if exists path from entrance to exit

}

function checkMazeStructure (maze, entrance, exit) {
	var visited = [],
		queue = [],
		dir = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3 };

	//debugger;
	var entranceDir;
	if (entrance[0] == 0) {
		entranceDir = dir.UP;
	} else if (entrance[0] == maze.length-1) {
		entranceDir = dir.DOWN;
	} else if (entrance[1] == 0) {
		entranceDir = dir.LEFT;
	} else if (entrance[1] == maze.length-1) {
		entranceDir = dir.RIGHT;
	}

	var isRight = true;
	queue.push({ row: entrance[0], col: entrance[1], dir: entranceDir });
	while (queue.length != 0 && isRight) {
		var field = queue.shift();

		if (field.dir != dir.UP && field.row > 0) { // can go up
			if (maze[field.row-1][field.col] == 0) {
				var i = 0;
				for (i; i<visited.length; i++) {
					if (visited[i].row == field.row-1 && visited[i].col == field.col) {
						break;
					} 
				}
				if (i == visited.length) {
					queue.push({ row: field.row-1, col: field.col, dir: dir.DOWN});
				} else {
					isRight = false;
				}
			}
		}

		if (field.dir != dir.DOWN && field.row < maze.length-1) { // can go down
			if (maze[field.row+1][field.col] == 0) {
				var i = 0;
				for (i; i<visited.length; i++) {
					if (visited[i].row == field.row+1 && visited[i].col == field.col) {
						break;
					}
				}
				if (i == visited.length) {
					queue.push({ row: field.row+1, col: field.col, dir: dir.UP });
				} else {
					isRight = false;
				}
			}
		}

		if (field.dir != dir.RIGHT && field.col < maze.length-1) { // can go right
			if (maze[field.row][field.col+1] == 0) {
				var i = 0;
				for (i; i<visited.length; i++) {
					if (visited[i].row == field.row && visited[i].col == field.col+1) {
						break;
					}
				}
				if (i == visited.length) {
					queue.push({ row: field.row, col: field.col+1, dir: dir.LEFT });
				} else {
					isRight = false;
				}
			}
		}

		if (field.dir != dir.LEFT && field.col > 0) { // can go down
			if (maze[field.row][field.col-1] == 0) {
				var i = 0;
				for (i; i<visited.length; i++) {
					if (visited[i].row == field.row && visited[i].col == field.col-1) {
						break;
					}
				}
				if (i == visited.length) {
					queue.push({ row: field.row, col: field.col-1, dir: dir.RIGHT });
				} else {
					isRight = false;
				}

			}
		}

		visited.push(field);
	}

	var i = 0;
	for (i; i<visited.length; i++) {
		if (visited[i].row == exit[0] && visited[i].col == exit[1]) {
			break;
		}
	}

	if (isRight && i < visited.length) { // is OK
		console.log("ok");
	} else {
		console.log("not ok");
	}
}

//checkMazeStructure ([[1,1,1],[1,0,0],[1,0,1]],[2,1],[1,2]);
// checkMazeStructure([[1,1,1,1,1,1,1,1],
					[1,0,0,0,1,1,0,0],
					[1,1,1,0,1,1,0,1],
					[1,1,0,0,0,0,0,1],
					[1,1,0,1,1,0,1,1],
					[1,1,0,1,1,0,1,1],
					[1,0,0,0,0,0,1,1],
					[1,1,0,1,1,1,1,1]],[7,2],[1,7]);



function getExitCoords(id) {
	var mazeIndex;
	for (var i=0; i<mazes.length; i++) {
		if (mazes[i].id == id) {
			mazeindex = i;
			break;
		}
	}

	if (mazeIndex != undefined) {
		return mazes[mazeIndex].maze.exit;
	}
}

function getElementsNumbers(id) {
	var mazeIndex;
	for (var i=0; i<mazes.length; i++) {
		if (mazes[i].id == id) {
			mazeindex = i;
			break;
		}
	}

	if (mazeIndex != undefined) {
		var numberOfZeros = 0,
			numberOfOnes = 0,
			resultArray = [],
			maze = mazes[mazeIndex].maze.structure;

		for (var i=0; i<maze.length; i++) {
			for (var j=0; j<maze.length; j++) {
				if (maze[i][j] == 0) {
					numberOfZeros++;
				} else {
					numberOfOnes++;
				}
			}
		}

		// array with walls and corridors
		resultArray.push(numberOfOnes);
		resultArray.push(numberOfZeros);
		return resultArray;
	}
	return [];
}

function getCosts (wallPrice, corridorPrice, torchPrice)




function showval () {
	return a;
}

exports.addMaze = addMaze;
exports.showval = showval;