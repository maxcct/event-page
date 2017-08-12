import React, { Component } from 'react';
import logo from './img/logo.png';
import './App.css';
import data from './json/data.json';

const imageFolderURL = "https://raw.githubusercontent.com/maxcct/event-page/master/src/img/";

class Map extends React.Component {
  componentDidMount() {
  	const position = {
	  lat: this.props.lat,
	  lng: this.props.lng
	};
    this.map = new window.google.maps.Map(this.refs.map, {
      center: position,
      zoom: 16
    });
    this.marker = new window.google.maps.Marker({
        position: position,
        map: this.map,
    });

  }
  
  render() {
    const mapStyle = {
      width: this.props.width,
      height: this.props.height
    };
    
    return (
      <div>
        <div ref="map" style={mapStyle}>I should be a map!</div>
      </div>
    );
  }
}


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
		<Header events={this.state.data.events} onClick={this.changeEvent} />
		<Event event={this.state.event} />
	  </div>
	);
  }
}

class Event extends Component {
constructor(props) {
	super(props);
	this.event = this.props.event;
	this.image = {
		backgroundImage: "url(" + imageFolderURL + this.event.image + ")"
	};
  }

  render() {
	return (
		<div>
			<div className="row" id="mid">
			  <div className="col-md-3"></div>
			  <div className="col-md-6" id="event">
								<div className="row event-row">
								  <h1>{this.event.name}</h1>
								</div>
								<div className="row event-row" id="image-row" style={this.image}>
									<Map lat={this.event.lat}
										 lng={this.event.lng}
										 width={300} height={280}/>
								</div>
								<div className="row">
									  <div className="col-md-6" id="booking-col">
									  	<Booking event={this.event}/>
									  </div>
									  <div className="col-md-6">
									  	<div id="event-text">
										  	<p>
										  		<strong>Who is this event for?</strong><br></br>
										  		{this.event.suitability}
										  	</p>
										  	<p>
										  		<strong>What areas does this event cover?</strong><br></br>
										  		{this.event.areas}
										  	</p>
										  	<p>
										  		<strong>Venue directions</strong><br></br>
										  		{this.event.directions}
										  	</p>
										  	<p>
										  		<strong>Nearest subway</strong><br></br>
										  		{this.event.subway}
										  	</p>
										  	<p id="map-label"><strong>Map</strong></p>
									  	</div>
									  	<div id="big-map">
											<Map lat={this.event.lat}
											 	 lng={this.event.lng}
											 	 width={460} height={300}/>
										</div>
									  </div>
								</div>
			  </div>
			  <div className="col-md-3"></div>
			</div>
			<div className="row" id="footer"></div>
	  </div>
	  );
  }
}

class Booking extends Component {
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
				<h4>Reserve your place now</h4>
				<form onSubmit={this.handleSubmit}>
					<div className="table-row">
						<p className="table-cell">
							<input onChange={this.handleChange} type="radio" name="room" id="needRoom" value="need"></input>
							<label htmlFor="needRoom">I need a room
								<span>{this.state.needRoomAvailable ? "Places available" : "Sorry, there are no places left"}</span>
							</label>
						</p>
					</div>
					<div className="table-row">
						<p className="table-cell">
							<input onChange={this.handleChange} type="radio" name="room" id="haveRoom" value="have"></input>
							<label htmlFor="haveRoom">I have a room
								<span>{this.state.haveRoomAvailable ? "Places available" : "Sorry, there are no places left"}</span>
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
					<p>
						We won't give your email address to anyone else.
						<br></br>
						See our <a>Privacy Policy</a> for more details.
					</p>
					<hr></hr>
					<input type="submit" value="Book"></input>
					<p id="bring-id">All our events are in licensed venues, so bring some ID just in case you're lucky enough to be asked your age!</p>
				</form>
			</div>
		)
	}
}

class Header extends Component {
  constructor(props) {
	super(props);
	this.handleClick = this.handleClick.bind(this);
	this.events = this.props.events.map((event, i) =>
	  <a key={i} id={event.id} className="nav-item" onClick={this.handleClick}>
		Event
	  </a>
	);
  }

  handleClick(e) {
	let event_id = e.target.id;
	this.props.onClick(event_id)
  }

  render() {
	return (
	  <div>
		<div className="row">
		  <div className="col-md-3"></div>
		  <div className="col-md-2">
			<img src={logo} alt="logo"></img>
		  </div>
		  <div className="col-md-7"></div>
		</div>
		<div className="row" id="nav">
		  <div className="row" id="top-nav">
			<div className="col-md-3"></div>
			<div className="col-md-6 nav-bar">
			  <a className="nav-item">Home</a>
			  <a className="nav-item">Events</a>
			</div>
			<div className="col-md-3"></div>
		  </div>
		  <div className="row" id="bottom-nav">
			<div className="col-md-3"></div>
			<div className="col-md-6 nav-bar">
			  {this.events}
			</div>
			<div className="col-md-3"></div>
		  </div>
		</div>
	  </div>
	);
  }
}

export default App;
