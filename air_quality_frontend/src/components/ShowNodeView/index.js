import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import Img from 'react-image';
const ShowNodeComponent = (props) => {
  const [state, setState] = useState({
    weatherInfo: null, 
    text: '',
    src: '',
    next_hour: '',
    next_three_hours: ''
  })
  const node = props.node
  useEffect(() => {

    const lat = node.lat;
    const lon = node.long;
    const url = 'https://api.darksky.net/forecast/848d48c94bd973b432daca581d268737/' + lat + ',' + lon;
    axios.get(url)
    .then(function (response) {
      // handle success
      //console.log(response);
      setState({...state, weatherInfo: response.data.currently});
      const source = axios.CancelToken.source();

      axios.get('/node', {
        params: {
          code: node.code
        }
        
      },{
        headers: {
          cancelToken: source.token
        }
        
      })
      .then(function (res) {
        let data = res.data.nodePredict[0].prediction;
      
        let next_hour = checkData(data[0])
        let next_tree_hour = checkData(data[3])
        setState({...state, next_hour: next_hour, next_three_hours: next_tree_hour});
      })
      .catch(function (error) {
        // handle error
          console.log(error);
      })
    })
    .catch(function (error) {
      // handle error
        console.log(error);
    })


  }, [props, state]) 

  const renderImage = () => {
    //debugger
    //console.log(node)
    let src = '', text = ''

    if (node.status.length === 1 && node.status[0] === 'Good') {
      src = require("../../images/good.png")
      text = node.status + 'Nothing to worry about'
    } 
    else if (node.status.length === 1) {
      src = require("../../images/warning.png")
      text = node.status + 'You should handle it'
    }
    else {
      src = require("../../images/danger.png")
      text = node.status + 'The concentration of pollutants is too high. You should protect your health.'
    }
    return [src, text]
  }
  if (state.weatherInfo) {
    let  [src, text] = renderImage()
    return (
      <div className="show-detail mb-3">
        <p><b>Current weather in:  </b> {node.station}</p>
        <div className="row">
          <div className="col-md-6 col-sm-12 col-xs-12 mb-5 img-responsive">
            <Img src={src} alt="image" />
          </div>
          <div className="col-md-6 col-sm-12 col-xs-12 mb-5 mt-2">
            <p>{'Summary: ' + state.weatherInfo.summary}</p>
            <p>{'Temperature: ' +Math.round(state.weatherInfo.temperature * 100) / 100 + ' C'} </p>
            <p>{'Humidity: ' + Math.round(state.weatherInfo.humidity * 100) /100 + ' %'}</p>
            <p>{'Wind: ' + Math.round(state.weatherInfo.windSpeed * 100 ) /100 + ' km/h'}</p>   
          </div>  
        </div>
        <div className="recomment">
          <p><small><b>Current: </b> {text}</small></p>
          <p><small><b>Next 1 hour : </b> {state.next_hour}</small></p>
          <p><small><b>After 3 hours : </b> {state.next_three_hours}</small></p>
        </div>
      </div>
    )
  }
  else return null
}
const checkData = (data ) =>{

  let str = ''
  let count = 0;
  if (data.so2 > 20) {
    count++;
    str += 'Index of So2 will high. '
  }
  if (data.pm10 > 100) {
    count++ ;
    str += 'Index of Pm10 will high. '
  }
  if (data.no2 > 100) {
    count++;
    str += 'Index of No2 will high. '
  }

  if (count === 0) {
    str += 'These Indexs will stable. Nothing to worry about'
  } else if (count === 1) {
    str += ' You should handle it'
  } else {
    str += ' The concentration of pollutants is too high. You should protect your health.'
  }
  return str;
}
export default ShowNodeComponent;