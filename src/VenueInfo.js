import React, { Component } from 'react';
import { Map } from './Map';

export class VenueInfo extends Component {
	render() {
		return (
			<div id="venue-info">
				<h2 id="venue-name">{this.props.event.venueName}</h2>
				<div id="date-time">
					{this.props.event.date}
					<br></br>
					{this.props.event.time}
				</div>
				<div id="small-map">
					<Map lat={this.props.event.lat}
						 lng={this.props.event.lng}
						 zoom={19} mapID="small"/>
				</div>
				<a href={this.props.event.mapLink} id="map-link">Venue's map & directions</a>
			</div>
		)
	}
}
