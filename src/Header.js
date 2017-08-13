import React, { Component } from 'react';
import logo from './img/logo.png';

export class Header extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.events = this.props.events.map((event, i) =>
			<a key={i} id={event.id} className="nav-item" onClick={this.handleClick}>
			Events
			</a>
		);
	}

	handleClick(e) {
		let event_id = e.target.id;
		this.props.onClick(event_id);
	}

	render() {
		return (
		<div id="header">
			<div className="row">
				<div id="logo">
					<img src={logo} alt="logo"></img>
				</div>
			</div>
			<div className="row" id="nav">
				<div className="row" id="top-nav">
					<div className="nav-bar">
						<a className="nav-item">Home</a>
						<a className="nav-item">Events</a>
					</div>
				</div>
				<div className="row" id="bottom-nav">
					<div className="nav-bar" id="bottom-nav-inner">
						{this.events}
					</div>
				</div>
			</div>
		</div>
		);
	}
}
