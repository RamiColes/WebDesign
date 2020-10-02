class Square extends React.Component {

	pieceFactory(props) {
		if(this.props.piece == "Pawn") {
			return <Pawn color={this.props.color}/>
		} else if(this.props.piece == "Rook") {
			return <Rook color={this.props.color}/>
		} else if(this.props.piece == "Knight") {
			return <Knight color={this.props.color}/>
		} else if(this.props.piece == "Bishop") {
			return <Bishop color={this.props.color}/>
		} else if(this.props.piece == "Queen") {
			return <Queen color={this.props.color}/>
		} else if(this.props.piece == "King") {
			return <King color={this.props.color}/>
		}
	}

	render() {
		const piece = this.pieceFactory(this.props)

		if(this.props.piece != "") {
			return (
				<button className={this.props.class + " cell"} id={this.props.id}>
					{piece}
				</button>
	    	);
		} else {
			return (
				<button className={this.props.class + " cell"} id={this.props.id}>
				</button>
		    );
		}
	}
}