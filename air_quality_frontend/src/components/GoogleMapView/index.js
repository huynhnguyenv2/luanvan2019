import React, {useState} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { compose, withProps } from "recompose";
import '../../index.scss';
const key = "AIzaSyAZ8wWKFz7aJiVOOmLN6iPjOD3Im1aN-00";
const GoogleMapView = compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ width: `80%`, height: `400px`, margin: `0 auto`}} />,
      mapElement: <div style={{ height: `80%` }} />,
      isMarkerShown: true
    }),
    withScriptjs,
    withGoogleMap
  )((props) => {
    const [state, setState] = useState({
      markIndex: 0,
    })
    const onToggleOpen = (index) => {
      setState({
        markIndex: index
      })
    }
    const listItems = !props.infoNodes ? [] : props.infoNodes.map(
      (item, id) => 
      {
        return <Marker       
              key={id}
              position={{lat: item.lat, lng: item.long}} 
              onClick={() => onToggleOpen(id)}>
        {  
          (state.markIndex === id) &&
          <InfoWindow onCloseClick={() => onToggleOpen(-1)}>
            <RenderInfoWindow item={item}/> 
          </InfoWindow>
        }
      </Marker>
      }     
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

const RenderInfoWindow = (props) => {
  return <div className="inforWindow"> 
    <p><b>Station: </b> {props.item.station}</p>
    <p><b>Status: </b>  {props.item.status} </p> 
    <i>See more...</i>
  </div>
}

export default GoogleMapView;