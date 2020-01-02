import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import Img from 'react-image';
const ShowNodeComponent = (props) => {
  const [state, setState] = useState({
    weatherInfo: null, 
    text: '',
    src: ''
  })
  const node = props.node
  useEffect(() => {
    let src = ''
    if (node.status) {
      if (node.status.length === 1 && node.status[0] === 'Good') {
        src = require("../../images/good.png")
        setState({...state, src: src, text: 'Air quality is Healthy. Enjoy your life.'})
      } 
      else if (node.status.length === 1) {
        src = require("../../images/warning.png")
        setState({...state, src: src, text: 'Alo alo'})
      }
      else {
        src = require("../../images/danger.png")
        setState({...state, src: src, text: 'kkkkkkk'})
      }
    }

    const lat = node.lat;
    const lon = node.long;
    const url = 'https://api.darksky.net/forecast/9d09fd8ed5b6b06b046f1f12cfdebb2d/' + lat + ',' + lon;
    axios.get(url)
    .then(function (response) {
      // handle success
      //console.log(response);
      setState({...state, weatherInfo: response.data.currently})
    })
    .catch(function (error) {
      // handle error
        console.log(error);
    })


  }, [props, state]) 

  const renderImage = () => {
    //debugger
    //console.log(node)
    
  }
  if (state.weatherInfo) {
    return (
      <div className="show-detail mb-3">
        <p><b>Current weather in:  </b> {node.station}</p>
        <div className="row">
          <div className="col-md-6 col-sm-12 col-xs-12 mb-5 img-responsive">
            <Img src={state.src} alt="image" />
          </div>
          <div className="col-md-6 col-sm-12 col-xs-12 mb-5 mt-2">
            <p>{'Summary: ' + state.weatherInfo.summary}</p>
            <p>{'Temperature: ' +Math.round(state.weatherInfo.temperature * 100) / 100 + ' C'} </p>
            <p>{'Humidity: ' + Math.round(state.weatherInfo.humidity * 100) /100 + ' %'}</p>
            <p>{'Wind: ' + Math.round(state.weatherInfo.windSpeed * 100 ) /100 + ' km/h'}</p>   
          </div>  
        </div>
        <div className="recomment">
    <p><b>Recommendation: </b> {state.text}</p>
        </div>
      </div>
    )
  }
  else return null
}
export default ShowNodeComponent;