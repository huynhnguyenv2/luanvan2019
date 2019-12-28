import React, {useState, useEffect}from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import moment from 'moment'
const RenderChart = (props) => {
  const [state, setState] = useState({
      data: {
          Co: [],
          So2: [],
          No2: [],
      },
      err: ''
  })
  const checkData = (v) => (v !== -1) ? Math.round(v * 100) / 100 : null;
  useEffect(() => {
    const source = axios.CancelToken.source();

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
          Co: [],
          No2: [],
          So2: [],
        }
        res.data.node.slice(0,2).forEach(
            (value) => {   
                let time = new Date(value.date_time)  
                let nodeP = res.data.nodePredict[0].prediction[indexNodePredict]
          
                if (moment(nodeP.date_time).isSame(value.date_time)) {
                  debugger
                  data.So2.push([ time, checkData(value.so2), checkData(nodeP.so2)])
                  data.Co.push([ time, checkData(value.co), checkData(nodeP.co) ])
                  data.No2.push([ time, checkData(value.no2), checkData(nodeP.no2) ])
                  indexNodePredict++;
                } else {
                  data.So2.push([ time, checkData(value.so2), null])
                  data.Co.push([ time, checkData(value.co), null ])
                  data.No2.push([ time, checkData(value.no2), null ])
                }
            }
        )
        while (indexNodePredict < res.data.nodePredict[0].prediction.length - 1){ 
      
          let nodeP = res.data.nodePredict[0].prediction[indexNodePredict]; 
          console.log(nodeP.date_time)
          let time = new Date(nodeP.date_time)
          data.So2.push([ time, null, checkData(nodeP.so2)])
          data.Co.push([ time, null, checkData(nodeP.co)])
          data.No2.push([ time, null, checkData(nodeP.no2)])
          indexNodePredict++;
        }
        console.log(data)
        setState({
            ...state, 
            data: {
                Co: data.Co,
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
    <Chart 
        className="mx-auto"
        key={index}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        columns={columns}
        rows={state.data[value]}
        options={{
          title: 'Index of ' + value,
          column: {groupWidth: '100%'},
          legend: 'none',
          vAxis: {viewWindow: { min: 0 } },
        }}
        height= {"100px"}
        width="100%"
    />
  );

  return (
    <div>
        {state.data ? listCharts: ""}
    </div>
  )
}
export default RenderChart;