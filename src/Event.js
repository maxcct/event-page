import React, { Component } from 'react';
import { VenueInfo } from './VenueInfo';
import { Map } from './Map';
import { Booking } from './Booking';

const imageFolderURL = "https://raw.githubusercontent.com/maxcct/event-page/master/src/img/";

export class Event extends Component {
	constructor(props) {
		super(props);
		this.image = {
			backgroundImage: "url(" + imageFolderURL + this.props.event.image + ")"
		};
	}

	render() {
		var chevronPosition = {left: ((this.props.event.id + 1) * 65).toString() + "px"};
		return (
			<div className="row" id="mid">
				<div id="event">
				<div id="before" style={chevronPosition}></div>
					<div className="row event-row">
						<h1>{this.props.event.eventName}<span> @ {this.props.event.venueName}</span></h1>
					</div>
					<div className="row event-row" id="image-row" style={this.image}>
						<VenueInfo event={this.props.event}/>
					</div>
					<div className="row" id="booking-event">
						<div className="col-md-6" id="booking-col">
							<Booking event={this.props.event}/>
						</div>
						<div className="col-md-6" id="event-col">
							<div id="event-text">
								<p>
									<strong>Who is this event for?</strong><br></br>
									{this.props.event.suitability}
								</p>
								<p>
									<strong>What areas does this event cover?</strong><br></br>
									{this.props.event.areas}
								</p>
								<p>
									<strong>Venue directions</strong><br></br>
									{this.props.event.directions}
								</p>
								<p>
									<strong>Nearest subway</strong><br></br>
									{this.props.event.subway}
								</p>
								<p id="map-label"><strong>Map</strong></p>
							</div>
							<div id="big-map">
								<Map lat={this.props.event.lat}
								lng={this.props.event.lng}
								zoom={16} mapID="big"/>
							</div>
						</div>
					</div>
				<div id="after" style={chevronPosition}></div>
				</div>
			</div>
		);
	}
}
