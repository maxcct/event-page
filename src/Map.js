import React from 'react';
import ReactDOM from 'react-dom';
import GoogleApiComponent from 'google-maps-react';

export class Container extends React.Component {
  render() {
    const style = {
      width: '50vw',
      height: '50vh'
    }
    return (
      <div style={style}>
        <Map google={this.props.google} />
      </div>
    )
  }
}

export class Map extends React.Component {
  componentDidMount() {
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = 14;
      let lat = 37.774929;
      let lng = -122.419416;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
  	}
  }

  render() {
    return (
      <div ref='map'>
        Loading map...
      </div>
    )
  }
}

export default new GoogleApiComponent({
  apiKey:  "AIzaSyDBQBchyKrQ753SM_hgzgi9az3oRv0b9aw"
})(Container)


import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends Component {

	render() {
		console.log(this.props.google.map);
	    return (
	      <Map google={this.props.google} zoom={14}>
	        <Marker name={'Current location'} />
	      </Map>
	    );
	  }
}
 
export default GoogleApiWrapper({
  apiKey: "AIzaSyDBQBchyKrQ753SM_hgzgi9az3oRv0b9aw"
})(MapContainer)