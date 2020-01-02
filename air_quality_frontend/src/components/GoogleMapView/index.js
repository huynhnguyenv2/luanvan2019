import React, {useState} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { compose, withProps } from "recompose";
import '../../index.scss';
const key = "AIzaSyAZ8wWKFz7aJiVOOmLN6iPjOD3Im1aN-00";
const GoogleMapView = compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ width: `60%`, height: `450px`, margin: `0 auto`}} />,
      mapElement: <div style={{ height: `90%` }} />,
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
    const handleClick = (node) => {
      props.onClick(node)
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
            <RenderInfoWindow item={item} onClick={handleClick}/> 
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
  let status = props.item.status
  //console.log(status)
  let warning = getWarningStatus(status);
  const handleClick = (event, node) => {
    event.preventDefault();
    props.onClick(node)
  }
  return <div className='inforWindow' > 
    <p><b>Station: </b> {props.item.station}</p>
    {renderStatus(props)}
    <a onClick={(e) => handleClick(e, props.item)}> <i>See more...</i></a>
  </div>
}
const renderStatus = (props) => {

  //console.log(props)
  let text = 'Unhealthy', className = 'nd-danger'
  if (props.item.status.length === 1 && props.item.status[0] === 'Good') {
    [text, className] = ['Healthy', 'nd-good']
  } else if (props.item.status.length === 1) {
    [text, className] = ['Moderate', 'nd-warning']
  }
  console.log(text)
  return <p><b>Status: </b><span className={'status ' + className}> {text} </span></p> 
}
const getWarningStatus = (status) => {
  if (status.length === 1 && status[0] === 'Good'){
    return 'stable'
  } else if (status.length === 1 ) { 
    return 'warning'
  } else {
    return 'danger' 
  }
}
export default GoogleMapView;