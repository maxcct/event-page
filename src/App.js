import React, { Component } from 'react';
import './App.css';
import data from './json/data.json';
import { Header } from './Header';
import { Event } from './Event';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: data,
			event: data.events[0]
		};
		this.changeEvent = this.changeEvent.bind(this);
	}

	changeEvent(newEvent) {
		this.setState({event: this.state.data.events[newEvent]});
	}

	render() {
		return (
			<div className="App">
				<div className="container">
					<Header events={this.state.data.events} onClick={this.changeEvent} />
					<Event event={this.state.event} />
					<div className="row" id="buffer"></div>
					<div className="row" id="footer"></div>
				</div>
			</div>
		);
	}
}

export default App;
