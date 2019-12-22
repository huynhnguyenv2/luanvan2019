import React, {useState, useEffect}from 'react';
import axios from 'axios';
import GoogleMapView from '../GoogleMapView';
import {Container} from 'react-bootstrap';
import "./homeStyle.scss"
import 'bootstrap/dist/css/bootstrap.css';
import ShowNodeComponent from '../ShowNodeView';
import RenderChart from '../NodeChartView'
const HomeComponent = (props) => {
    const [state, setState] = useState({
        data: null,
        node: null
    });


    useEffect(() => {
        const source = axios.CancelToken.source();

        setState({node: 1});
        axios.get('/nodes', {
            cancelToken: source.token
        })
        .then(function (response) {
            // handle successss    
            setState({...state, data: response.data})
            
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            setState({...state, err: error})
        });
        return () => {
            source.cancel();
        }
    },[])
    // Make a request for a user with a given ID

    return ( 
        <Container> 
            <div className="mt-3">
                <h2 className="text-center">Air Pollution: Real-time Air Quality Index</h2>
            </div>
            {/* <div className="stations">
                <ul>
                    {state.data ? <RenderStation {...state.data}/>: "" }
                </ul>
                       
            </div>   */}
            <div className="mt-5">
                <GoogleMapView infoNodes={state.data}/>
            </div>
            <div className="mt-3 row">
                <div className="col-md-6 col-sm-12 col-xs-12"   > 
                    <div className="panel" >
                        <div className="panel-heading">
                            <p>Dữ liệu Runtime 24 giờ của các thông số.</p>
                        </div>
                        <RenderChart node_code={28079035}/>   
                    </div>    
                </div>     
                <div className="col-md-6 col-sm-12 col-xs-12"> 
                    <div className="panel" >
                        <div className="panel-heading"> 
                            <p><b>Madrid AQI:</b> Madrid Real-time Air Quality Index (AQI).</p>
                        </div>
                        <ShowNodeComponent />
                    </div> 
                    
                </div>  
            </div>
            
        </Container>
    )
};

const RenderStation = (props) => {
    return <>
        <li>{props[0].id}</li>
        <li>{props[1].id}</li>
    </>
}


export default HomeComponent;