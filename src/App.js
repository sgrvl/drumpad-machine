import React, { Component } from "react";
import "./App.css";

const sounds = {};
function importAll(r) {
	r.keys().forEach((key) => (sounds[key] = r(key)));
}
importAll(require.context("./sounds/", true));

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div id="drum-machine">
				<Pads />
				{/*<div id="display">This is the display</div>*/}
			</div>
		);
	}
}

class Pads extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="pads">
				<DrumPad id="Kick-1" text="Q" src={sounds["./lofi-kick-1.wav"]} />
				<DrumPad id="Kick-2" text="W" src={sounds["./lofi-kick-2.wav"]} />
				<DrumPad id="Kick-3" text="E" src={sounds["./lofi-kick-3.wav"]} />
				<DrumPad
					id="Percussion-1"
					text="A"
					src={sounds["./lofi-percussion-1.wav"]}
				/>
				<DrumPad
					id="Percussion-2"
					text="S"
					src={sounds["./lofi-percussion-2.wav"]}
				/>
				<DrumPad
					id="Percussion-3"
					text="D"
					src={sounds["./lofi-percussion-3.wav"]}
				/>
				<DrumPad id="Snare-1" text="Z" src={sounds["./lofi-snare-1.wav"]} />
				<DrumPad id="Snare-2" text="X" src={sounds["./lofi-snare-2.wav"]} />
				<DrumPad id="Snare-3" text="C" src={sounds["./lofi-snare-3.wav"]} />
			</div>
		);
	}
}

class DrumPad extends Component {
	constructor(props) {
		super(props);
		this.audioRef = React.createRef();
		this.btnRef = React.createRef();
		this.handleClick = this.handleClick.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	componentDidMount() {
		window.addEventListener("keydown", this.handleKeyPress);
		window.addEventListener("keyup", () => this.btnRef.current.blur());
	}

	handleClick() {
		this.audioRef.current.play();
		this.audioRef.current.currentTime = 0;
		this.btnRef.current.blur();
	}

	handleKeyPress(event) {
		if (event.key === this.props.text.toLowerCase()) {
			this.btnRef.current.click();
			this.btnRef.current.focus();
		}
		console.log(this.btnRef.current);
	}

	render() {
		return (
			<button
				className="drum-pad"
				id={this.props.id}
				ref={this.btnRef}
				onClick={this.handleClick}
			>
				{this.props.text}
				<audio
					src={this.props.src}
					id={this.props.text}
					type="audio/wav"
					ref={this.audioRef}
				/>
			</button>
		);
	}
}

export default App;
