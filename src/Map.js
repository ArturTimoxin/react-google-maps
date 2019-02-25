import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";
import { G_MAPS_API } from "./g-maps-api";
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");
export const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDR5dtYn2uoLVh_Mvz7kjBlmCXtM9UoItg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px`, width: "500px" }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        coordsPolyline: [{ lat: null, lng: null }],
        coordsQueryPlace: { lat: null, lng: null },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const location = places[0].geometry.location;
          console.log("lat=" + location.lat() + "lng=" + location.lng());
          let coordsPolyline = [];
          this.setState({ coordsQueryPlace: { lat: location.lat(), lng: location.lng() } });
          G_MAPS_API("POST", { lat: location.lat(), lng: location.lng() }).then(res => {
            coordsPolyline = res.snappedPoints.map(coord => {
              return { lat: coord.location.latitude, lng: coord.location.longitude };
            });
            console.log(coordsPolyline);
            this.setState({
              coordsPolyline: coordsPolyline,
            });
          });
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
          placeholder="Input your address for get path to PowerCode"
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
      <Polyline path={props.coordsPolyline} />
      <Marker position={props.coordsQueryPlace} />
    </GoogleMap>
  </div>
));
