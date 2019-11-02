import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const ShowNodeComponent = (props) => {
  return (
    <div className="show-detail">
        <div className="row">
          <div className="index col-md-6"> 115</div>
          <div className="col-md-6">
            <p>Unhealthy for Sensitive Groups</p>
            <p>Updated on Saturday 11:00</p>
            Temp.: 26°C
          </div>
        </div>
        <div className="node-items">
            <p>Current Past</p>
            <NodeItemComponent />
        </div>
    </div>
  )
}

const NodeItemComponent = () => {
  return (
    <div className="node-item">
      <span>PM2.5</span>
      <span>Map</span>
    </div>
  )
    
}
export default ShowNodeComponent;