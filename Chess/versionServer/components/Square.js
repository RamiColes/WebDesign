class Square extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			id: '',
			piece: {}
		}
		this.updateSquare = this.updateSquare.bind(this)
	}

	updateSquare() {
		this.props.updateBoard(this)
	}

	componentDidMount() {
		this.setState({
			id: this.props.id,
			piece: this.props.piece
		});

	}

	render() {
		const piece = this.props.piece

		if(piece.type) {
			return (
				<div className={this.props.class + " cell"} id={this.props.id} onClick={this.updateSquare}>
					<Piece id={piece.id} type={piece.type} color={piece.color} pos={this.props.pos} selectPiece={this.props.selectPiece}/>
				</div>
	    	);
		} else {
			return (
				<div className={this.props.class + " cell"} id={this.props.id} onClick={this.updateSquare}>
				</div>
		    );
		}
	}
}