const text = "Hello this is a test.";
let index = 0;
let paused = false;
let intervalTimer = 50;
let audio = new Audio('ahn.wav');

function writeText() {
	if(!paused) {
		audio.pause();
		audio.currentTimer = 0;
		document.body.innerText = text.slice(0, index);
		audio.play();
		index++;

		if(index > text.length) {
			index = 0;
			paused = true;
		}
	}
}

function toggleWriter(e) {
	if(e.keyCode === 32) {
		paused = !paused;
	}
}

document.onkeydown = toggleWriter;
setInterval(writeText, intervalTimer);