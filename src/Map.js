import React from 'react';

export class Map extends React.Component {
	componentDidMount() {
		const position = {
			lat: this.props.lat,
			lng: this.props.lng
		};
	
		this.map = new window.google.maps.Map(this.refs.map, {
			center: position,
			zoom: this.props.zoom
		});

		this.marker = new window.google.maps.Marker({
			position: position,
			map: this.map
		});
	}

	render() {
		return (
			<div ref="map" className="map" id={this.props.mapID}>I should be a map!</div>
		);
	}
}
