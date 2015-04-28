'use strict'

// array of objects { maze: object, id: int }
// maze = { structure: , entrance: , exit: }

var mazes = [{ maze: { structure: [ [1,1,1,1,1,1,1,1],
					 				[1,0,0,0,1,1,0,0],
					 				[1,1,1,0,1,1,0,1],
					 				[1,1,0,0,0,0,0,1],
					 				[1,1,0,1,1,0,1,1],
					 				[1,1,0,1,1,0,1,1],
					 				[1,0,0,0,1,0,1,1],
					 				[1,1,0,1,1,1,1,1]], entrance: [7,2], exit: [1,7]}, id: 1 }],
	nextMazeId = 2;

function addMaze (maze, entrance) {
	
	// check if maze is a square
	var numOfRows = maze.length;
	var i = 0,
		j = 0,
		message = "";

	for (i = 0; i<numOfRows; i++) {
		if (numOfRows != maze[i].length) {
			// maze isn't a square
			message = "Maze is not a square.";
			return message;
		}
	}
	
	// check if maze has minimum size: 3
	if (numOfRows < 3) {
		// maze is too small
		message = "Maze is too small.";
		return message;
	}
	
	// check if maze consists only with zeros and ones
	for (i=0; i<numOfRows; i++) {
		for (j=0; j<numOfRows; j++) {
			if (maze[i][j] != 0 && maze[i][j] != 1) {
				// maze dosn't consists only with zeros and ones
				message = "Maze dosn't consists only with zeros and ones";
				return message;
			}
		}
	}
	

	// checking if maze is valid
	// we assume that there are only two fileds on external walls with 0 - entrance and exit
	// they can't be corners of maze and can't be connected directly
	// it must be at least one way from entrance to exit 
	// there may not be chambers - four fields with zeros making squere
	// there may not be cycles (loops) in maze

	// check if entrance coords aren't bigger than maze dimension
	if (entrance[0] >= numOfRows || entrance[1] >= numOfRows) {
		// entrance coords are out of bound
		message = "Entrance coords are out of bounds of maze.";
		return message;
	}

	// check if entrance coords has value 0 in maze
	if (maze[entrance[0]][entrance[1]] == 1) {
		// entrance isn't 0
		message = "Field with entrance is not zero.";
		return message;
	}
	

	// check if entrance is on external walls excluding corners
	if (entrance[0] == 0 || entrance[0] == numOfRows-1) {
		if (entrance[1] == 0 || entrance[1] == numOfRows-1) {
			// entrance in corner
			message = "Entrance is in the corner.";
			return message;
		}
	} else if (entrance[1] == 0 || entrance[1] == numOfRows-1) {
		if (entrance[0] == 0 || entrance[0] == numOfRows-1) {
			// entrance in corner
			message = "Entrance is in the corner.";
			return message;
		}
	} else {
		// entrance inside maze
		message = "Entrance can't be inside maze.";
		return message;
	}

	// check fields on external walls - two zeros
	var numOfZerosOnExWalls = 0;
	var exit = [];
	for (i=0; i<numOfRows; i++) {
		if (i == 0 || i == numOfRows-1) { // up and down of maze
			for (j=0; j<numOfRows; j++) {
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
					exit.push(0);
				}
			}
			if (maze[i][numOfRows-1] == 0) {
				numOfZerosOnExWalls++;
				if (i != entrance[0] || numOfRows-1 != entrance[1]) {
					exit.push(i);
					exit.push(numOfRows-1);
				}
			}
		}
	}
	
	if (numOfZerosOnExWalls != 2) {
		// zeros on external wall not equal to 2	
		message = "There must be exactly two zeros on external fields - entrance and exit.";
		
		return message;
	}
	
	// check if exit is on external walls excluding corners
	if (exit[0] == 0 || exit[0] == numOfRows-1) {
		if (exit[1] == 0 || exit[1] == numOfRows-1) {
			// exit in corner
			message = "Exit is in the corner.";
			return message;
		}
	} else if (exit[1] == 0 || exit[1] == numOfRows-1) {
		if (exit[0] == 0 || exit[0] == numOfRows-1) {
			// exit in corner
			message = "Exit is in the corner.";
			return message;
		}
	} else {
		// exit inside maze
		message = "Exit can't be insiede maze.";
		return message;
	}
	
	// check if entrance and exit aren't connected directly
	if (entrance[0] == exit[0]) {
		if (entrance[1]+1 == exit[1] || entrance[1] == exit[1]+1) {
			// directly connected
			message = "Entrance and exit can't be connected directly.";
			return message;
		}
	} else if (entrance[1] == exit[1]) {
		if (entrance[0]+1 == exit[0] || entrance[0] == exit[0]+1) {
			// directly connected
			message = "Entrance and exit can't be connected directly.";
			return message;
		}
	}
	
	// check if exists path from entrance to exit
	var isStructureValid = checkMazeStructure(maze, entrance, exit);
	var new_maze;

	if (!isStructureValid) {
		message = "Inside structure of maze is not valid.";
		return message;
	} else {
		new_maze = { maze: { structure: maze, entrance: entrance, exit: exit }, id: nextMazeId };
		mazes.push(new_maze);
		nextMazeId++;
		return nextMazeId-1;	
	}


}

function checkMazeStructure (maze, entrance, exit) {
	var visited = [],
		queue = [],
		dir = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3 };
	var i = 0,
		visited_length = 0,
		maze_length = maze.length;

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
		visited_length = visited.length;

		if (field.dir != dir.UP && field.row > 0) { // can go up
			if (maze[field.row-1][field.col] == 0) {
				i = 0;
				for (i; i<visited_length; i++) {
					if (visited[i].row == field.row-1 && visited[i].col == field.col) {
						break;
					} 
				}
				if (i == visited_length) {
					queue.push({ row: field.row-1, col: field.col, dir: dir.DOWN});
				} else {
					isRight = false;
				}
			}
		}

		if (field.dir != dir.DOWN && field.row < maze_length-1) { // can go down
			if (maze[field.row+1][field.col] == 0) {
				i = 0;
				for (i; i<visited_length; i++) {
					if (visited[i].row == field.row+1 && visited[i].col == field.col) {
						break;
					}
				}
				if (i == visited_length) {
					queue.push({ row: field.row+1, col: field.col, dir: dir.UP });
				} else {
					isRight = false;
				}
			}
		}

		if (field.dir != dir.RIGHT && field.col < maze_length-1) { // can go right
			if (maze[field.row][field.col+1] == 0) {
				i = 0;
				for (i; i<visited_length; i++) {
					if (visited[i].row == field.row && visited[i].col == field.col+1) {
						break;
					}
				}
				if (i == visited_length) {
					queue.push({ row: field.row, col: field.col+1, dir: dir.LEFT });
				} else {
					isRight = false;
				}
			}
		}

		if (field.dir != dir.LEFT && field.col > 0) { // can go down
			if (maze[field.row][field.col-1] == 0) {
				i = 0;
				for (i; i<visited_length; i++) {
					if (visited[i].row == field.row && visited[i].col == field.col-1) {
						break;
					}
				}
				if (i == visited_length) {
					queue.push({ row: field.row, col: field.col-1, dir: dir.RIGHT });
				} else {
					isRight = false;
				}

			}
		}

		visited.push(field);
	}

	i = 0;
	visited_length = visited.length;
	for (i; i<visited_length; i++) {
		if (visited[i].row == exit[0] && visited[i].col == exit[1]) {
			break;
		}
	}

	if (isRight && i < visited_length) { // is OK
		return true;
	} else {
		return false;
	}
}

function getCosts (id, wallPrice, corridorPrice, torchPrice) {
	var mazeIndex,
		i,
		mazes_length,
		maze_length;
	i = 0;
	mazes_length = mazes.length;
	for (i=0; i<mazes_length; i++) {
		if (mazes[i].id == id) {
			mazeIndex = i;
			break;
		}
	}

	if (mazeIndex != undefined) {
		var wallsAndCorridorsNumber = getElementsNumbers(id);
		var entrance = mazes[mazeIndex].maze.entrance;
		var exit = mazes[mazeIndex].maze.exit;
		var maze = mazes[mazeIndex].maze.structure;

		var visited = [],
			queue = [], 
			dir = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3 };

		var entranceDir;

		maze_length = maze.length;
		if (entrance[0] == 0) {
			entranceDir = dir.UP;
		} else if (entrance[0] == maze_length-1) {
			entranceDir = dir.DOWN;
		} else if (entrance[1] == 0) {
			entranceDir = dir.LEFT;
		} else if (entrance[1] == maze_length-1) {
			entranceDir = dir.RIGHT;
		}

		queue.push({ row: entrance[0], col: entrance[1], dir: entranceDir, torch: true });
		while (queue.length != 0) {
			var field = queue.shift();

			if (field.dir != dir.UP && field.row > 0) { // can go up
				if (maze[field.row-1][field.col] == 0) {
					if (field.torch) {
						queue.push({ row: field.row-1, col: field.col, dir: dir.DOWN, torch: false });
					} else {
						queue.push({ row: field.row-1, col: field.col, dir: dir.DOWN, torch: true });
					}

				}
			}

			if (field.dir != dir.DOWN && field.row < maze_length-1) { // can go down
				if (maze[field.row+1][field.col] == 0) {
					if (field.torch) {
						queue.push({ row: field.row+1, col: field.col, dir: dir.UP, torch: false });
					} else {
						queue.push({ row: field.row+1, col: field.col, dir: dir.UP, torch: true });
					}
				}
			}

			if (field.dir != dir.RIGHT && field.col < maze_length-1) { // can go right
				if (maze[field.row][field.col+1] == 0) {
					if (field.torch) {
						queue.push({ row: field.row, col: field.col+1, dir: dir.LEFT, torch: false });
					} else {
						queue.push({ row: field.row, col: field.col+1, dir: dir.LEFT, torch: true });
					}
				}
			}

			if (field.dir != dir.LEFT && field.col > 0) { // can go down
				if (maze[field.row][field.col-1] == 0) {
					if (field.torch) {
						queue.push({ row: field.row, col: field.col-1, dir: dir.RIGHT, torch: false });
					} else {
						queue.push({ row: field.row, col: field.col-1, dir: dir.RIGHT, torch: true });
					}

				}
			}

			visited.push(field);
		}

		var torchNumber = 0;
		for (i=0; i<visited.length; i++) {
			if (visited[i].torch) {
				torchNumber++;
			}
		}

		var wallsPrice = wallPrice * wallsAndCorridorsNumber[0];
		var corridorsPrice = corridorPrice * wallsAndCorridorsNumber[1];
		var torchsPrice = torchPrice * torchNumber;

		console.log("walls price: " + wallsPrice);
		console.log("corridors price: " + corridorsPrice);
		console.log("torchs price: " + torchsPrice);

		var sum = wallsPrice + corridorsPrice + torchsPrice;

		return { mazeExists: true, price: sum };
	} else {
		return { mazeExists: false };
	}
}

function getExitCoords(id) {
	var mazeIndex,
		i,
		mazes_length,
		exit = [];
	mazes_length = mazes.length;
	for (i=0; i<mazes_length; i++) {
		if (mazes[i].id == id) {
			mazeIndex = i;
			break;
		}
	}


	if (mazeIndex != undefined) {
		exit.push(mazes[mazeIndex].maze.exit[0]);
		exit.push(mazes[mazeIndex].maze.exit[1]);
		return exit;
	} else {
		return []
	}
}

function getPath (id) {
	var mazeIndex,
		i,
		mazes_length,
		maze_length;
	mazes_length = mazes.length;
	for (i=0; i<mazes_length; i++) {
		if (mazes[i].id == id) {
			mazeIndex = i;
			break;
		}
	}

	if (mazeIndex != undefined) {
		var entrance = mazes[mazeIndex].maze.entrance;
		var exit = mazes[mazeIndex].maze.exit;
		var maze = mazes[mazeIndex].maze.structure;

		var visited = [],
			queue = [], 
			dir = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3 };

		var entranceDir;
		maze_length = maze.length;
		if (entrance[0] == 0) {
			entranceDir = dir.UP;
		} else if (entrance[0] == maze_length-1) {
			entranceDir = dir.DOWN;
		} else if (entrance[1] == 0) {
			entranceDir = dir.LEFT;
		} else if (entrance[1] == maze_length-1) {
			entranceDir = dir.RIGHT;
		}


		queue.push({ row: entrance[0], col: entrance[1], dir: entranceDir });
		while (queue.length != 0) {
			var field = queue.shift();

			if (field.dir != dir.UP && field.row > 0) { // can go up
				if (maze[field.row-1][field.col] == 0) {	
					queue.push({ row: field.row-1, col: field.col, dir: dir.DOWN, rowPrev: field.row, colPrev: field.col });
				}
			}

			if (field.dir != dir.DOWN && field.row < maze_length-1) { // can go down
				if (maze[field.row+1][field.col] == 0) {
					queue.push({ row: field.row+1, col: field.col, dir: dir.UP, rowPrev: field.row, colPrev: field.col });
				}
			}

			if (field.dir != dir.RIGHT && field.col < maze_length-1) { // can go right
				if (maze[field.row][field.col+1] == 0) {
					queue.push({ row: field.row, col: field.col+1, dir: dir.LEFT, rowPrev: field.row, colPrev: field.col });
				}
			}

			if (field.dir != dir.LEFT && field.col > 0) { // can go down
				if (maze[field.row][field.col-1] == 0) {
					queue.push({ row: field.row, col: field.col-1, dir: dir.RIGHT, rowPrev: field.row, colPrev: field.col });
				}
			}

			visited.push(field);
			if (field.row == exit[0] && field.col == exit[1]) {
				break;
			}
		}

		

		var path = [];
		var tempField = [exit[0], exit[1]];
		var visited_length = visited.length;

		path.push([tempField[0],tempField[1]]);
		while (tempField[0] != entrance[0] || tempField[1] != entrance[1]) {
			for (var i=0; i<visited_length; i++) {
				if (tempField[0] == visited[i].row && tempField[1] == visited[i].col) {
					tempField[0] = visited[i].rowPrev;
					tempField[1] = visited[i].colPrev;
					path.push([tempField[0],tempField[1]]);
					break;
				}
			}
		}

		path = path.reverse();
		return path;
	} else {
		return []
	}


}

function getElementsNumbers(id) {
	var mazeIndex,
		mazes_length,
		i, j;
	mazes_length = mazes.length;
	for (i=0; i<mazes_length; i++) {
		if (mazes[i].id == id) {
			mazeIndex = i;
			break;
		}
	}

	if (mazeIndex != undefined) {
		var numberOfZeros = 0,
			numberOfOnes = 0,
			resultArray = [],
			maze = mazes[mazeIndex].maze.structure,
			maze_length;
		maze_length = maze.length;

		for (i=0; i<maze_length; i++) {
			for (j=0; j<maze_length; j++) {
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
	} else {
		return [];
	}
}


exports.addMaze = addMaze;
exports.checkMazeStructure = checkMazeStructure;
exports.getCosts = getCosts;
exports.getExitCoords = getExitCoords;
exports.getPath = getPath;
exports.getElementsNumbers = getElementsNumbers;