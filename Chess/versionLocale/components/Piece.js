class Piece extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			type:'',
			color:'',
			posX:0,
			posY:0,
			alive: true,
			movePattern:''
		}
	}

	defineMovePattern(){}
	canMove(){}
	move(){}
	eat(){}
	die(){}

	render(){
		return(
			<img class="cell" src={"images/"+this.state.type+this.state.color+".png"}></img>
		);
	}
}