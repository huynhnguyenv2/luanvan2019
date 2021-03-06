import React, {useState, useEffect}from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import moment from 'moment'
const RenderChart = (props) => {
  const [state, setState] = useState({
      data: {
          Pm10: [],
          So2: [],
          No2: [],
          Temp: [],
          Humi: []
      },
      err: ''
  })
  const checkData = (v) => (v !== -1) ? Math.round(v * 100) / 100 : null;
  useEffect(() => {
    const source = axios.CancelToken.source();
    if (props.node_code === 111111) {
      axios.get('/node', {
        params: {
          code: props.node_code
        }
        
      },{
        headers: {
          cancelToken: source.token
        }
        
      })
      .then(function (res) {
          let indexNodePredict = 0;
          let data = {
            Temp: [],
            Humi: [],
            Light: []
          }
          
          res.data.node.slice(-10, -1).forEach(
              (value) => {   
                  
                  let time = new Date(value.date_time)  
                  let nodeP = res.data.nodePredict[0].prediction[indexNodePredict]
                 
                  if (moment(nodeP.date_time).isSame(value.date_time)) {
                    data.Temp.push([ time, checkData(value.temp), checkData(nodeP.temp)])
                    data.Humi.push([ time, checkData(value.humi), checkData(nodeP.humi)])
                    data.Light.push([ time, checkData(value.light), checkData(nodeP.light) ])
                    indexNodePredict++;
                  } else {
                    data.Temp.push([ time, checkData(value.temp), null])
                    data.Humi.push([ time, checkData(value.humi), null ])
                    data.Light.push([ time, checkData(value.light), null ])
                  }
              }
          )
          while (indexNodePredict < res.data.nodePredict[0].prediction.length - 1){ 
        
            let nodeP = res.data.nodePredict[0].prediction[indexNodePredict]; 
            //console.log(nodeP.date_time)
            let time = new Date(nodeP.date_time)
            data.Temp.push([ time, null, checkData(nodeP.temp)])
            data.Humi.push([ time, null, checkData(nodeP.humi)])
            data.Light.push([ time, null, checkData(nodeP.light)])
            indexNodePredict++;
          }
          console.log(data)
          setState({
              ...state, 
              data: {
                  Temp: data.Temp,
                  Humi: data.Humi,
                  Light: []//data.Light
              }
          }) 
      }) 
      .catch(function (error) {
          // handle error
          console.log(error);
          setState({...state, err: error})
      });
      return () => {
          source.cancel();
      }
    } else {
      axios.get('/node', {
        params: {
          code: props.node_code
        }
        
      },{
        headers: {
          cancelToken: source.token
        }
        
      })
      .then(function (res) {
          let indexNodePredict = 0;
          let data = {
            Pm10: [],
            No2: [],
            So2: [],
          }
          res.data.node.slice(-20, -11).forEach(
              (value) => {   
                  let time = new Date(value.date_time)  
                  let nodeP = res.data.nodePredict[0].prediction[indexNodePredict]
                  console.log(value.so2)
                  if (moment(nodeP.date_time).isSame(value.date_time)) {
                    data.So2.push([ time, checkData(value.so2), checkData(nodeP.so2)])
                    data.Pm10.push([ time, checkData(value.pm10), checkData(nodeP.pm10) ])
                    data.No2.push([ time, checkData(value.no2), checkData(nodeP.no2) ])
                    indexNodePredict++;
                  } else {
                    data.So2.push([ time, checkData(value.so2), null])
                    data.Pm10.push([ time, checkData(value.pm10), null ])
                    data.No2.push([ time, checkData(value.no2), null ])
                  }
              }
          )
          while (indexNodePredict < res.data.nodePredict[0].prediction.length - 1){ 
        
            let nodeP = res.data.nodePredict[0].prediction[indexNodePredict]; 
            //console.log(nodeP.date_time)
            let time = new Date(nodeP.date_time)
            data.So2.push([ time, null, checkData(nodeP.so2)])
            data.Pm10.push([ time, null, checkData(nodeP.pm10)])
            data.No2.push([ time, null, checkData(nodeP.no2)])
            indexNodePredict++;
          }
          //console.log(data)
          setState({
              ...state, 
              data: {
                  Pm10: data.Pm10,
                  So2: data.So2,
                  No2: data.No2
              }
          }) 
      }) 
      .catch(function (error) {
          // handle error
          console.log(error);
          setState({...state, err: error})
      });
      return () => {
          source.cancel();
      }
    }
  },[props])
  
  const columns = [
    {
        type: "date",
    },
    {
        type: "number",
    },
    {
        type: "number"
    }
  ]

  const listCharts = Object.keys(state.data).map((value,index) =>
  {
    if (value === 'Temp') {
      return <Chart 
        className="mx-auto"
        key={index}
        chartType="ScatterChart"
        loader={<div>Loading Chart</div>}
        columns={columns}
        rows={state.data[value]}
        options={{
          title: 'Index of ' + value,
          column: {groupWidth: '100%'},
          legend: 'none',
          vAxis: {viewWindow: { min: 0, max: 60} },
        }}
        height= {"200px"}
        width="100%"
    />
    }
    return <Chart 
        className="mx-auto"
        key={index}
        chartType="ScatterChart"
        loader={<div>Loading Chart</div>}
        columns={columns}
        rows={state.data[value]}
        options={{
          title: 'Index of ' + value,
          column: {groupWidth: '100%'},
          legend: 'none',
          vAxis: {viewWindow: { min: 0} },
        }}
        height= {"200px"}
        width="100%"
    />
  }
  );
      

  return (
    <div>
        {state.data ? listCharts: ""}
    </div>
  )
}
export default RenderChart;