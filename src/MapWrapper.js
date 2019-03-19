import React, { Component } from "react";
const google = window.google;

export default class MapWrapper extends Component {
  state = {
    startMarker: null,
  };
  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();
    const inputSearchBox = new google.maps.places.SearchBox(this.searchBox);
    const map = new google.maps.Map(this.map, {
      zoom: 15,
      center: { lat: 47.815899, lng: 35.170246 },
    });
    directionsDisplay.setMap(map);
    let startMarker = new google.maps.Marker({
      map: map,
      position: { lat: 47.815899, lng: 35.170246 },
    });
    this.setState({ startMarker: startMarker });
    inputSearchBox.addListener("places_changed", () => {
      let places = inputSearchBox.getPlaces();
      if (places.length === 0) {
        return;
      } else {
        let clearMarker = this.state.startMarker;
        clearMarker.setMap(null);
        this.setState({ startMarker: clearMarker });
        if (places[0].geometry.location) {
          this.calculateAndDisplayRoute(directionsService, directionsDisplay, places[0].geometry.location);
        } else {
          window.alert("Returned place contains no geometry");
          return;
        }
      }
    });
  }

  calculateAndDisplayRoute = (directionsService, directionsDisplay, dest) => {
    directionsService.route(
      {
        origin: { lat: 47.815899, lng: 35.170246 },
        destination: dest,
        travelMode: "DRIVING",
      },
      function(response, status) {
        if (status === "OK") {
          directionsDisplay.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      },
    );
  };
  render() {
    return (
      <div className="mapWrapper">
        <input
          id="searchBox"
          className="controls"
          style={{ width: "100%", height: "30px", marginBottom: "30px" }}
          ref={node => {
            this.searchBox = node;
          }}
          type="text"
          placeholder="Input your address for get direction to PowerCode"
        />
        <div
          style={{ width: 500, height: 500 }}
          id="map"
          ref={node => {
            this.map = node;
          }}
        />
      </div>
    );
  }
}
