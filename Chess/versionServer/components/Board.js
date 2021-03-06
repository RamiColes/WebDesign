let pieces = [
[{type: 'Rook', color: 'B', id:'rb1'},
{type: 'Knight', color: 'B', id:'knb1'},
{type: 'Bishop', color: 'B', id:'bb1'},
{type: 'Queen', color: 'B', id:'qb1'},
{type: 'King', color: 'B', id:'kib1'},
{type: 'Bishop', color: 'B', id:'bb2'},
{type: 'Knight', color: 'B', id:'knb2'},
{type: 'Rook', color: 'B', id:'rb2'}],
[{type: 'Pawn', color: 'B', id:'pb1'},
{type: 'Pawn', color: 'B', id:'pb2'},
{type: 'Pawn', color: 'B', id:'pb3'},
{type: 'Pawn', color: 'B', id:'pb4'},
{type: 'Pawn', color: 'B', id:'pb5'},
{type: 'Pawn', color: 'B', id:'pb6'},
{type: 'Pawn', color: 'B', id:'pb7'},
{type: 'Pawn', color: 'B', id:'pb8'}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{type: 'Pawn', color: 'W', id:'pw1'},
{type: 'Pawn', color: 'W', id:'pw2'},
{type: 'Pawn', color: 'W', id:'pw3'},
{type: 'Pawn', color: 'W', id:'pw4'},
{type: 'Pawn', color: 'W', id:'pw5'},
{type: 'Pawn', color: 'W', id:'pw6'},
{type: 'Pawn', color: 'W', id:'pw7'},
{type: 'Pawn', color: 'W', id:'pw8'}],
[{type: 'Rook', color: 'W', id:'rw1'},
{type: 'Knight', color: 'W', id:'knw1'},
{type: 'Bishop', color: 'W', id:'bw1'},
{type: 'Queen', color: 'W', id:'qw1'},
{type: 'King', color: 'W', id:'kiw1'},
{type: 'Bishop', color: 'W', id:'bw2'},
{type: 'Knight', color: 'W', id:'knw2'},
{type: 'Rook', color: 'W', id:'rw2'}]
];

class Board extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			board: [],
			selected: false,
			currPiece: {}
		}
		this.selectPiece = this.selectPiece.bind(this);
		this.updateBoard = this.updateBoard.bind(this);
	}

	componentDidMount() {
		this.setState({board: this.renderBoard()})
	}

	selectPiece(piece) {
		if(!this.state.selected) {
			console.log('selected')
			this.setState({
				selected: !this.state.selected,
				currPiece: piece
			});
		}
	}

	renderBoard() {
		let b = [];
		for(let i=0; i<pieces.length; i++) {
			let row = [];
			for(let j=0; j<pieces.length; j++) {
				if(i%2 == j%2) {
					row.push(<Square
						class={"cellW"}
						id={""+i+j}
						piece={pieces[i][j]}
						pos={[i,j]}
						selectPiece={this.selectPiece}
						updateBoard={this.updateBoard}/>);
				} else {
					row.push(<Square
						class={"cellB"}
						id={""+i+j}
						piece={pieces[i][j]}
						pos={[i,j]}
						selectPiece={this.selectPiece}
						updateBoard={this.updateBoard}/>);
				}
			}
			b.push(<div className="board-row">{row}</div>)
		}
		return b;
	}

	compareArrays(arr1, arr2) {
		if(arr1.length != arr2.length)
			return false

		for(var i=0; i<arr1.length; i++) {
			if(arr1[i] != arr2[i])
				return false
		}

		return true;
	}

	updateBoard(square) {
		if(this.state.selected) {
			var currPiece = this.state.currPiece;
			var oldPos = currPiece.state.pos;

			var squareId = square.state.id.split("");
			var newPos = [Number(squareId[0]), Number(squareId[1])];

			this.move(currPiece, oldPos, newPos)
		}
	}

	getPawnMoves(currPiece, oldPos) {
		var validMoves = [];
		if(currPiece.state.color == "W") {
			if(oldPos[0] == 6)
				validMoves.push([oldPos[0]-2,oldPos[1]])
			if(oldPos[0]-1 >= 0 && !pieces[oldPos[0]-1][oldPos[1]].type) //Check if the square in front of the pawn is empty
				validMoves.push([oldPos[0]-1,oldPos[1]])
			if(oldPos[0]-1 >= 0 && oldPos[1]-1 >= 0) { // Not out of bounds
				if(pieces[oldPos[0]-1][oldPos[1]-1].type) //Check if pawn can capture left
					validMoves.push([oldPos[0]-1, oldPos[1]-1])
			}
			if(oldPos[0]-1 >= 0 && oldPos[1]+1 < 8) { // Not out of bounds
				if(pieces[oldPos[0]-1][oldPos[1]+1].type) //Check if pawn can capture right
					validMoves.push([oldPos[0]-1,oldPos[1]+1])
			}
		} else {
			if(oldPos[0] == 1)
				validMoves.push([oldPos[0]+2,oldPos[1]])
			if(oldPos[0]+1 < 8 && !pieces[oldPos[0]+1][oldPos[1]].type) //Check if the square in front of the pawn is empty
				validMoves.push([oldPos[0]+1,oldPos[1]])
			if(oldPos[0]+1 < 8 && oldPos[1]-1 >= 0) { // Not out of bounds
				if(pieces[oldPos[0]+1][oldPos[1]-1].type) //Check if pawn can capture left
					validMoves.push([oldPos[0]+1, oldPos[1]-1])
			}
			if(oldPos[0]+1 < 8 && oldPos[1]+1 < 8) { // Not out of bounds
				if(pieces[oldPos[0]+1][oldPos[1]+1].type) //Check if pawn can capture right
					validMoves.push([oldPos[0]+1,oldPos[1]+1])
			}
		}
		return validMoves;
	}

	getRookMoves(currPiece, oldPos) {
		var validMoves = [];
		var pieceColor = currPiece.state.color;
		var blocked = [false, false, false, false]; // checks if rook cant move further : top, bottom, right, left

		for(var i=1; i<pieces.length; i++) {	
			if(!blocked[0] && oldPos[0]-i >= 0) {
				if(pieces[oldPos[0]-i][oldPos[1]].type) {
					if(pieces[oldPos[0]-i][oldPos[1]].color == pieceColor) {
						blocked[0] = true;
					} else {
						blocked[0] = true;
						validMoves.push([[oldPos[0]-i],[oldPos[1]]])
					}
				} else
					validMoves.push([[oldPos[0]-i],[oldPos[1]]])
			}
			if(!blocked[1] && oldPos[0]+i < 8) {
				if(pieces[oldPos[0]+i][oldPos[1]].type) {
					if(pieces[oldPos[0]+i][oldPos[1]].color == pieceColor) {
						blocked[1] = true;
					} else {
						blocked[1] = true;
						validMoves.push([[oldPos[0]+i],[oldPos[1]]])
					}
				} else
					validMoves.push([[oldPos[0]+i],[oldPos[1]]])
			}

			if(!blocked[2] &&oldPos[1]-i >= 0) {
				if(pieces[oldPos[0]][oldPos[1]-i].type) {
					if(pieces[oldPos[0]][oldPos[1]-i].color == pieceColor) {
						blocked[2] = true;
					} else {
						blocked[2] = true;
						validMoves.push([[oldPos[0]],[oldPos[1]-i]])
					}
				} else
					validMoves.push([[oldPos[0]],[oldPos[1]-i]])
			}
			if(!blocked[3] && oldPos[1]+i < 8) {
				if(pieces[oldPos[0]][oldPos[1]+i].type) {
					if(pieces[oldPos[0]][oldPos[1]+i].color == pieceColor) {
						blocked[3] = true;
					} else {
						blocked[3] = true;
						validMoves.push([[oldPos[0]],[oldPos[1]+i]])
					}
				} else
					validMoves.push([[oldPos[0]],[oldPos[1]+i]])
			}
		}
		return validMoves;
	}

	getKnightMoves(currPiece, oldPos) {
		var validMoves = []

		if(oldPos[0]-2 >= 0 && oldPos[1]-1 >= 0 && currPiece.state.color != pieces[oldPos[0]-2][oldPos[1]-1].color) {
			validMoves.push([[oldPos[0]-2],[oldPos[1]-1]])
		}
		if(oldPos[0]-1 >= 0 && oldPos[1]-2 >= 0 && currPiece.state.color != pieces[oldPos[0]-1][oldPos[1]-2].color ) {
			validMoves.push([[oldPos[0]-1],[oldPos[1]-2]])
		}
		if(oldPos[0]+1 < 8 && oldPos[1]-2 >= 0 && currPiece.state.color != pieces[oldPos[0]+1][oldPos[1]-2].color) {
			validMoves.push([[oldPos[0]+1],[oldPos[1]-2]])
		}
		if(oldPos[0]+2 < 8 && oldPos[1]-1 >= 0 && currPiece.state.color != pieces[oldPos[0]+2][oldPos[1]-1].color) {
			validMoves.push([[oldPos[0]+2],[oldPos[1]-1]])
		}
		if(oldPos[0]+2 < 8 && oldPos[1]+1 < 8 && currPiece.state.color != pieces[oldPos[0]+2][oldPos[1]+1].color) {
			validMoves.push([[oldPos[0]+2],[oldPos[1]+1]])
		}
		if(oldPos[0]+1 < 8 && oldPos[1]+2 < 8 && currPiece.state.color != pieces[oldPos[0]+1][oldPos[1]+2].color) {
			validMoves.push([[oldPos[0]+1],[oldPos[1]+2]])
		}
		if(oldPos[0]-1 >= 0 && oldPos[1]+2 < 8 && currPiece.state.color != pieces[oldPos[0]-1][oldPos[1]+2].color) {
			validMoves.push([[oldPos[0]-1],[oldPos[1]+2]])
		}
		if(oldPos[0]-2 >= 0 && oldPos[1]+1 < 8 && currPiece.state.color != pieces[oldPos[0]-2][oldPos[1]+1].color) {
			validMoves.push([[oldPos[0]-2],[oldPos[1]+1]])
		}

		return validMoves;
	}

	getBishopMoves(currPiece, oldPos) {
		var validMoves = [];
		var pieceColor = currPiece.state.color;
		var blocked = [false, false, false, false]; // checks if rook cant move further : 

		for(var i=1; i<pieces.length; i++) {	
			if(!blocked[0] && oldPos[0]-i >= 0 && oldPos[1]-i >= 0) {
				if(pieces[oldPos[0]-i][oldPos[1]-i].type) {
					if(pieces[oldPos[0]-i][oldPos[1]-i].color == pieceColor) {
						blocked[0] = true;
					} else {
						blocked[0] = true;
						validMoves.push([[oldPos[0]-i],[oldPos[1]-i]])
					}
				} else
					validMoves.push([[oldPos[0]-i],[oldPos[1]-i]])
			}

			if(!blocked[1] && oldPos[0]-i >= 0 && oldPos[1]+i < 8) {
				if(pieces[oldPos[0]-i][oldPos[1]+i].type) {
					if(pieces[oldPos[0]-i][oldPos[1]+i].color == pieceColor) {
						blocked[1] = true;
					} else {
						blocked[1] = true;
						validMoves.push([[oldPos[0]-i],[oldPos[1]+i]])
					}
				} else
					validMoves.push([[oldPos[0]-i],[oldPos[1]+i]])
			}
			if(!blocked[2] && oldPos[0]+i < 8 && oldPos[1]-i >= 0) {
				if(pieces[oldPos[0]+i][oldPos[1]-i].type) {
					if(pieces[oldPos[0]+i][oldPos[1]-i].color == pieceColor) {
						blocked[2] = true;
					} else {
						blocked[2] = true;
						validMoves.push([[oldPos[0]+i],[oldPos[1]-i]])
					}
				} else
					validMoves.push([[oldPos[0]+i],[oldPos[1]-i]])
			}
			if(!blocked[3] && oldPos[0]+i < 8 && oldPos[1]+i < 8) {
				if(pieces[oldPos[0]+i][oldPos[1]+i].type) {
					if(pieces[oldPos[0]+i][oldPos[1]+i].color == pieceColor) {
						blocked[3] = true;
					} else {
						blocked[3] = true;
						validMoves.push([[oldPos[0]+i],[oldPos[1]+i]])
					}
				} else
					validMoves.push([[oldPos[0]+i],[oldPos[1]+i]])
			}
		}
		return validMoves;
	}

	getQueenMoves(currPiece, oldPos) {
		var validMoves = [];
		var verticalMoves = this.getRookMoves(currPiece, oldPos)
		var diagMoves = this.getBishopMoves(currPiece, oldPos)

		//Adds vertical moves to valid moves
		for(var i=0; i<verticalMoves.length; i++) {
			validMoves.push(verticalMoves[i])
		}

		//Adds diagonal moves to valid moves
		for(var i=0; i<diagMoves.length; i++) {
			validMoves.push(diagMoves[i])
		}

		return validMoves
	}

	getKingMoves(currPiece, oldPos) {
		var validMoves = [];
		if(oldPos[0]-1 >= 0 && pieces[oldPos[0]-1][oldPos[1]].color != currPiece.state.color)
			validMoves.push([[oldPos[0]-1],[oldPos[1]]])
		if(oldPos[0]+1 < 8 && pieces[oldPos[0]+1][oldPos[1]].color != currPiece.state.color)
			validMoves.push([[oldPos[0]+1],[oldPos[1]]])
		if(oldPos[1]-1 >= 0 && pieces[oldPos[0]][oldPos[1]-1].color != currPiece.state.color)
			validMoves.push([[oldPos[0]],[oldPos[1]-1]])
		if(oldPos[1]+1 < 8 && pieces[oldPos[0]][oldPos[1]+1].color != currPiece.state.color)
			validMoves.push([[oldPos[0]],[oldPos[1]+1]])
		if(oldPos[0]-1 >= 0 && oldPos[1]-1 >= 0 && pieces[oldPos[0]-1][oldPos[1]-1].color != currPiece.state.color)
			validMoves.push([[oldPos[0]-1],[oldPos[1]-1]])
		if(oldPos[0]+1 < 8 && oldPos[1]-1 >= 0 && pieces[oldPos[0]+1][oldPos[1]-1].color != currPiece.state.color)
			validMoves.push([[oldPos[0]+1],[oldPos[1]-1]])
		if(oldPos[0]-1 >= 0 && oldPos[1]+1 < 8 && pieces[oldPos[0]-1][oldPos[1]+1].color != currPiece.state.color)
			validMoves.push([[oldPos[0]-1],[oldPos[1]+1]])
		if(oldPos[0]+1 < 8 && oldPos[1]+1 < 8 && pieces[oldPos[0]+1][oldPos[1]+1].color != currPiece.state.color)
			validMoves.push([[oldPos[0]+1],[oldPos[1]+1]])

		return validMoves;
	}

	validMove(currPiece, oldPos, newPos) {
		var validMoves = [];
 		if(currPiece.state.color != pieces[newPos[0]][newPos[1]].color) { //Not moving on same team piece
 			var pieceType = currPiece.state.type
 			if(pieceType == "Pawn")
 				validMoves = this.getPawnMoves(currPiece, oldPos);
 			else if(pieceType == "Rook")
 				validMoves = this.getRookMoves(currPiece, oldPos)
 			else if(pieceType == "Knight")
 				validMoves = this.getKnightMoves(currPiece, oldPos)
 			else if(pieceType == "Bishop")
 				validMoves = this.getBishopMoves(currPiece, oldPos)
 			else if(pieceType == "Queen")
 				validMoves = this.getQueenMoves(currPiece, oldPos)
 			else if(pieceType == "King")
 				validMoves = this.getKingMoves(currPiece, oldPos)
		}

		for(var i=0; i<validMoves.length; i++) { //Checks if the new position is a valid move
			if(this.compareArrays(newPos, validMoves[i]))
				return true;
		}

		return false
	}

	move(currPiece, oldPos, newPos) {
		if(this.validMove(currPiece, oldPos, newPos)) {
			var newPiece = {type:currPiece.state.type, color:currPiece.state.color, id:currPiece.state.id}
			pieces[newPos[0]][newPos[1]] = newPiece;
			pieces[oldPos[0]][oldPos[1]] = {};

			this.setState({
				selected: false,
				currPiece: {}
			});
			this.setState({board: this.renderBoard()});

		} else {
			this.setState({
				selected: false,
				currPiece: {}
			});
		}
	}

	render() {
		return this.state.board;
	}
}