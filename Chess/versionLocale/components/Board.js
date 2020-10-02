class Board extends React.Component {
	renderBoard() {
		let board = [];
		let pieces = [
		['Rook', 'Knight', 'Bishop', 'Queen', 'King', 'Bishop', 'Knight', 'Rook'],
		['Pawn','Pawn','Pawn','Pawn','Pawn','Pawn','Pawn','Pawn'],
		['','','','','','','',''],
		['','','','','','','',''],
		['','','','','','','',''],
		['','','','','','','',''],
		['Pawn','Pawn','Pawn','Pawn','Pawn','Pawn','Pawn','Pawn'],
		['Rook', 'Knight', 'Bishop', 'Queen', 'King', 'Bishop', 'Knight', 'Rook']
		];

		let colors = [
		['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
		['B','B','B','B','B','B','B','B'],
		['','','','','','','',''],
		['','','','','','','',''],
		['','','','','','','',''],
		['','','','','','','',''],
		['W','W','W','W','W','W','W','W'],
		['W','W','W','W','W','W','W','W']
		];

		for(let i=0; i<pieces.length; i++) {
			let row = [];
			for(let j=0; j<pieces.length; j++) {
				if(i%2 == j%2) {
					row.push(<Square class={"cellW"} id={""+i+j} piece={pieces[i][j]} color={colors[i][j]}/>);
				} else {
					row.push(<Square class={"cellB"} id={""+i+j} piece={pieces[i][j]} color={colors[i][j]}/>);
				}
			}
			board.push(<div className="board-row">{row}</div>)
		}
		return board;
	}

	populateBoard(board) {
		
	}

	render() {
		var board = [];
		board = this.renderBoard();
		this.populateBoard(board)
		return board;
	}
}