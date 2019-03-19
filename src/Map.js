import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps";
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");
const google = window.google;
export const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=API_KEY",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px`, width: "500px" }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentDidMount() {
      const refs = {};
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: new google.maps.LatLng(47.815899, 35.170246),
          destination: new google.maps.LatLng(47.8230788, 35.168138200000044), // ??????????????? ne rabotaet WHY???
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            console.log(result);
            this.setState({
              directions: result,
            });
          } else {
            console.log(`error fetching directions ${result}`);
          }
        },
      );
      this.setState({
        coordsQueryPlace: {},
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const location = places[0].geometry.location;
          this.setState({ coordsQueryPlace: { lat: location.lat(), lng: location.lng() } });
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <div className="g-map">
    <div data-standalone-searchbox="">
      <StandaloneSearchBox ref={props.onSearchBoxMounted} bounds={props.bounds} onPlacesChanged={props.onPlacesChanged}>
        <input
          type="text"
          placeholder="Input your address for get direction to PowerCode"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `500px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </StandaloneSearchBox>
    </div>
    <GoogleMap defaultZoom={15} defaultCenter={{ lat: 47.815899, lng: 35.170246 }}>
      <Marker position={{ lat: 47.815899, lng: 35.170246 }} />
      {props.directions && <DirectionsRenderer directions={props.directions} />}
      {props.coordsQueryPlace && <Marker position={props.coordsQueryPlace} />}
    </GoogleMap>
  </div>
));
