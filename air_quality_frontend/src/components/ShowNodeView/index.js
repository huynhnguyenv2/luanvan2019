import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const ShowNodeComponent = (props) => {
  return (
    <div className="show-detail">
        <div className="row">
          <div className="index col-md-6"> <h3 className="text-center mt-3">115</h3></div>
          <div className="col-md-6">
            <p>Unhealthy for Sensitive Groups</p>
            <p>Updated on Saturday 11:00</p>
          </div>
        </div>
        <div className="node-items container">
            <p>Predict in the next 6 hours:</p>
            
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