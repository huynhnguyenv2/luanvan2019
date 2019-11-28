import React, {useState, useEffect}from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

const RenderChart = (props) => {
  const [state, setState] = useState({
      data: {
          Co: [],
          So2: [],
          No2: [],
          O2: [],
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
        let data = {
          Co: [],
          No2: [],
          So2: [],
          O2: []
        }
        res.data.slice(0,23).forEach(
            (value) => {   
                console.log(new Date(value.date_time))
                data.So2.push([ new Date(value.date_time), checkData(value.so2)])
                data.Co.push([ new Date(value.date_time), checkData(value.co) ])
                data.No2.push([ new Date(value.date_time), checkData(value.no2) ])
                data.O2.push([ new Date(value.date_time), checkData(value.o2)])
            }
        )
        setState({
            ...state, 
            data: {
                Co: data.Co,
                So2: data.So2,
                No2: data.No2,
                O2: data.O2
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
    }
  ]

  const listCharts = Object.keys(state.data).map((value,index) =>
    <Chart 
        className="mx-auto"
        key={index}
        chartType="ColumnChart"
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