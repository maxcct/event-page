import React, { Component } from 'react';
import logo from './img/logo.png';
import './App.css';
import data from './json/data.json';

const imageFolderURL = "https://raw.githubusercontent.com/maxcct/event-page/master/src/img/";

class Map extends React.Component {
  constructor() {
    super();
  }
  
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
      width: 400,
      height: 250,
      border: '1px solid black'
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
	this.image = imageFolderURL + this.event.image;

  }

  render() {
	console.log(this.image);
	return (
	  <div className="row" id="mid">
		  <div className="col-md-3"></div>
		  <div className="col-md-6" id="event">
			<div className="row">
			  <h1>{this.event.name}</h1>
			</div>
			<div className="row">
			  <img src={this.image}
				   alt={this.event.imageAlt}
				   id="event-image">
			  </img>
			</div>
			<div className="row">
			  <div className="col-md-6">
			  	<Booking />
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
				  	<p><strong>Map</strong></p>
			  	</div>
				<Map lat={this.event.lat}
				 	 lng={this.event.lng}/>
			  </div>
			  <div className="col-md-3"></div>
			</div>
		  </div>
		  <div className="col-md-3"></div>
	  </div>
	  );
  }
}

class Booking extends Component {
	render() {
		return (
			<div id="booking">
				<h4>Reserve your place now</h4>
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
		<div className="row nav">
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
