import React, { Component } from 'react';
import logo from './img/logo.png';
import './App.css';
import data from './json/data.json';

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
  }

  render() {
    console.log(this.props.event.imageSRC);
    return (
      <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8" id="event">
            <div className="row">
              <h1>{this.props.event.name}</h1>
            </div>
            <div className="row">
              <img src="" alt={this.props.event.imageAlt}></img>
            </div>
          </div>
          <div className="col-md-2"></div>
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
          <div className="col-md-2"></div>
          <div className="col-md-2">
            <img src={logo} alt="logo"></img>
          </div>
          <div className="col-md-8"></div>
        </div>
        <div className="row nav">
          <div className="row" id="top-nav">
            <div className="col-md-2"></div>
            <div className="col-md-8 nav-bar">
              <a className="nav-item">Home</a>
              <a className="nav-item">Events</a>
            </div>
            <div className="col-md-2"></div>
          </div>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 nav-bar">
              {this.events}
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
