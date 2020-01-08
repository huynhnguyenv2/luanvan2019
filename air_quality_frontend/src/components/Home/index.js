import React, {useState, useEffect}from 'react';
import axios from 'axios';
import GoogleMapView from '../GoogleMapView';
import 'bootstrap/dist/css/bootstrap.css';
import ShowNodeComponent from '../ShowNodeView';
import RenderChart from '../NodeChartView';
import moment from 'moment'
const HomeComponent = (props) => {
    const [state, setState] = useState({
        data: {},
        node: {}
    });
    
    const setNode = (node) => {
       
        setState({...state, node: node });
    }
    useEffect(() => {
        const source = axios.CancelToken.source();   
        axios.get('/nodes', {
            cancelToken: source.token
        })
        .then(function (response) {
          
            setState({...state, data: response.data, node: response.data[0]})
            console.log(response.data)
        })
        .catch(function (error) {
          
            console.log(error);
            setState({...state, err: error})
        });
        return () => {
            source.cancel();
        }
    },[])

    return ( 
        <div> 
            <div className="header">
                <h2 className="text-center">Real-time Air Quality Index</h2>
            </div>
            
            <div className="map-view">
                <GoogleMapView infoNodes={state.data} onClick={setNode}/>
            </div>
            <div className="info-view container ">
                <div className="info-text">
                    
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12 mb-5"> 
                        <div className="panel" >
                            <div className="row">
                                <div className="col-md-6 col-sm-6 col-xs-6">
                                    <p className="text"><b>Station: </b> {state.node.station}</p>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6 row ">
                                    <p className="col-md-4">Index RealTime</p> <div className="square-realtime"> </div>
                                    <p className="col-md-4">Index Predict</p> <div className="square-predict"></div>
                                </div>
                            </div>
                            
                            <RenderChart node_code={state.node.code}/> 
                        </div>    
                    </div>     
                    <div className="col-md12  col-sm-12 col-xs-12 mb-5"> 
                        <div className="panel" >
                            <p className="text float-right mr-3"><small> {moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}</small></p>
                            <ShowNodeComponent node={state.node}/>
                        </div> 
                        
                    </div>  
                </div>
                
            </div>
              
        </div>
    )
};

const RenderStation = (props) => {
    return <>
        <li>{props[0].id}</li>
        <li>{props[1].id}</li>
    </>
}


export default HomeComponent;