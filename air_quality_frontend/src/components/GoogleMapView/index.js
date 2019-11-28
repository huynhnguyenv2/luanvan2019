import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { compose, withProps, withStateHandlers } from "recompose";

const key =  "AIzaSyAZ8wWKFz7aJiVOOmLN6iPjOD3Im1aN-00";
const GoogleMapView = compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `500px`}} />,
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
    const listItems = !props.infoNodes ? [] : props.infoNodes.map(
      (item, index) => 
        <Marker 
                key={index}
                position={{lat: item.lat, lng: item.long}} 
                onClick={props.onToggleOpen}>
          {
            props.isOpen &&
            <InfoWindow onCloseClick={props.onToggleOpen}>
              <div>{item.station}</div>
            </InfoWindow>
          }
        </Marker>
      
    ) 
    
    return <GoogleMap 
      defaultZoom={11}
      defaultCenter={{lat: 40.423852777777775, lng: -3.712247222222224}}
    >
      {
        props.isMarkerShown && listItems
      } 
    </GoogleMap >
    })
export default GoogleMapView;