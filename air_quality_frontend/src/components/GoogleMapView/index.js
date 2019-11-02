import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { compose, withProps, withStateHandlers } from "recompose";

const key = 1 || "AIzaSyAZ8wWKFz7aJiVOOmLN6iPjOD3Im1aN-00";
const GoogleMapView = compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px`}} />,
      mapElement: <div style={{ height: `80%` }} />,
      isMarkerShown: true
    }),
    withStateHandlers(() => ({
      isOpen: true,
    }), {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }),
    withScriptjs,
    withGoogleMap
  )((props) => {
    const position = { lat: 0, lng: 40 };
    const position2 = { lat: 0, lng: 30};
    return <GoogleMap
      defaultZoom={8}
      defaultCenter={position}
    >
      { props.isMarkerShown &&
        <>
          <Marker position={position} onClick={props.onToggleOpen}>
            {
              props.isOpen &&
              <InfoWindow onCloseClick={props.onToggleOpen}>
                <div>Hoang here</div>
              </InfoWindow>
            }
          </Marker>
          <Marker position={position2} onClick={props.onToggleOpen}>
            {
              props.isOpen &&
              <InfoWindow onCloseClick={props.onToggleOpen}>
                <div>Hoang here</div>
              </InfoWindow>
            }
          </Marker>
        </>

      }
  
    </GoogleMap >
    })
export default GoogleMapView;