import React, { Component } from 'react';
import logo from './img/logo.png';
import './App.css';
import data from './json/data.json';

const imageFolderURL = "https://raw.githubusercontent.com/maxcct/event-page/master/src/img/";

const ARC_DE_TRIOMPHE_POSITION = {
  lat: 48.873947,
  lng: 2.295038
};

const EIFFEL_TOWER_POSITION = {
  lat: 48.858608,
  lng: 2.294471
};

class Map extends Component {
  render() {
    const mapStyle = {
      width: 500,
      height: 300,
      border: '1px solid black'
    };
    
    return (
      <div ref="map" style={mapStyle}>I should be a map!</div>
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
		<Map />
	  </div>
	);
  }
}

class Event extends Component {
constructor(props) {
	super(props);
	this.image = imageFolderURL + this.props.event.image;
  }

  render() {
	console.log(this.image);
	return (
	  <div className="row" id="mid">
		  <div className="col-md-3"></div>
		  <div className="col-md-6" id="event">
			<div className="row">
			  <h1>{this.props.event.name}</h1>
			</div>
			<div className="row">
			  <img src={this.image}
				   alt={this.props.event.imageAlt}
				   id="event-image">
			  </img>
			</div>
			<div className="row">
			  <br></br>
			</div>
		  </div>
		  <div className="col-md-3"></div>
	  </div>
	  );
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
