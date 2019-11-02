import React, {useState, useEffect}from 'react';
import { Chart } from 'react-google-charts';
const RenderChart = (props) => {
  const [state, setState] = useState({
      data: {
          Co: [],
          So2: [],
          No2: [],
          O2: [],
      }
  })

  const setData = () => {
      let data = {
          Co: [],
          No2: [],
          So2: [],
          O2: []
      }
      props.data.slice(0,11).forEach(
          (value) => {
              data.So2.push([ new Date(value.datetime), parseFloat(value.so2)])
              data.Co.push([ new Date(value.datetime), parseFloat(value.co)])
              data.No2.push([ new Date(value.datetime), parseFloat(value.no2)])
              data.O2.push([ new Date(value.datetime), parseFloat(value.o2)])
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
  }
  useEffect(setData,[props])
  
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