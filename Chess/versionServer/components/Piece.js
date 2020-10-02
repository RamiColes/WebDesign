class Piece extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			id: '',
			type: '',
			pos: [],
			color: '',
		}
		this.handleClick = this.handleClick.bind(this)
	}

	componentDidMount() {
		this.setState({
			id: this.props.id,
			type: this.props.type,
			pos: this.props.pos,
			color: this.props.color
		});
	}

	componentDidUpdate(previousProps, previousState) {
	    if (previousProps !== this.props) {
    		this.setState({
				id: this.props.id,
				type: this.props.type,
				pos: this.props.pos,
				color: this.props.color
			});
	    }
	}

	handleClick(props) {
		this.props.selectPiece(this)
	}

	render(){
		return(
			<img class="cell" src={"images/"+this.props.type+this.props.color+".svg"} onClick={this.handleClick}></img>
		);
	}
}