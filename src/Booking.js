import React, { Component } from 'react';

export class Booking extends Component {
	constructor(props) {
		super(props);
		this.state = {
			room: undefined,
			nameInput: "Please enter your name",
			emailInput: "Please enter your email address",
			needRoomAvailable: this.props.event.needRoomAvailable,
			haveRoomAvailable: this.props.event.haveRoomAvailable
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		let key = e.target.id;
		if (key === "needRoom" || key === "haveRoom") {
			key = "room";
		};
		this.setState({
			[key]: e.target.value
		});
	}

	handleSubmit(e) {
		let response = this.validateSubmission();
		if (!response) {
			let room = this.state.room;
			let hope;
			if (room === "need") {
				let previousTotal = this.state.needRoomAvailable;
				this.setState({
					needRoomAvailable: previousTotal - 1
				});
				hope = "room!";
			} else {
				let previousTotal = this.state.haveRoomAvailable;
				this.setState({
					haveRoomAvailable: previousTotal - 1
				});
				hope = "flatmate!";
			}
			response = "Thanks, " + this.state.nameInput + "! We hope you find a " + hope;		
		};
		alert(response);
		console.log(this.state);
		e.preventDefault();
	}

	validateSubmission() {
		let response = "";
		if (!/(.+)@(.+){2,}\.(.+){2,}/.test(this.state.emailInput)) {
			response += "Please enter a valid email address. ";
		}
		if (this.state.nameInput === "Please enter your name") {
			response += "Please enter your name. ";
		}
		if (!this.state.room) {
			response += "Please specify whether you need or have a room.";
		}
		return response
	}

	render() {
		return (
			<div id="booking">
				<h2>Reserve your place now</h2>
				<form onSubmit={this.handleSubmit}>
					<div className="table-row">
						<p className="table-cell">
							<input onChange={this.handleChange} type="radio" name="room" id="needRoom" value="need"></input>
							<label htmlFor="needRoom">I need a room
								<span className="available">{this.state.needRoomAvailable ? "Places available" : "Sorry, there are no places left"}</span>
							</label>
						</p>
					</div>
					<div className="table-row">
						<p className="table-cell">
							<input onChange={this.handleChange} type="radio" name="room" id="haveRoom" value="have"></input>
							<label htmlFor="haveRoom">I have a room
								<span className="available">{this.state.haveRoomAvailable ? "Places available" : "Sorry, there are no places left"}</span>
							</label>
						</p>
					</div>
					<hr></hr>
					<p className="text-input-label"><strong>Name</strong></p>
					<p>
						<input onChange={this.handleChange} type="text" id="nameInput" value={this.state.nameInput}></input>
					</p>
					<p className="text-input-label"><strong>Email</strong></p>
					<p>
						<input onChange={this.handleChange} type="text" id="emailInput" value={this.state.emailInput}></input>
					</p>
					<p id="privacy">
						We won't give your email address to anyone else.
						<br></br>
						See our <a href="https://www.spareroom.com/content/default/privacy-us">Privacy Policy</a> for more details.
					</p>
					<hr></hr>
					<input type="submit" value="Book"></input>
					<p id="bring-id">All our events are in licensed venues, so bring some ID just in case you're lucky enough to be asked your age!</p>
				</form>
			</div>
		)
	}
}
