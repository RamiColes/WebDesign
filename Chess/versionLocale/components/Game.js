class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			whiteTurn:true
		}
	}

	render() {
	    return (
	    <div id="game-board" class="offset-md-2">
	      <Board />

	      
	      <div id="test">
	      	TODO: REMOVE TEST DIV
	      </div>
	    </div>
	    );
	}
}