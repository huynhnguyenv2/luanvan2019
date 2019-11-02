import React, {useState, useEffect}from 'react';
import axios from 'axios';
import GoogleMapView from '../GoogleMapView';
import {Container} from 'react-bootstrap';
import "./homeStyle.scss";
import 'bootstrap/dist/css/bootstrap.css';
import ShowNodeComponent from '../ShowNodeView';
import RenderChart from '../NodeChartView'
const HomeComponent = (props) => {
    const [state, setState] = useState({
        data: null,
        node: null
    });

    const source = axios.CancelToken.source();

    useEffect(() => {
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
    const listNode = state.data ? state.data.filter(item => item.id === 28079001) : [];
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
            <div className="mt-3 row">
                <div className="col-md-6 col-sm-12 col-xs-12"   > 
                    <div className="panel" >
                        <div className="panel-heading">
                            <p>Dữ liệu VN_AQI 48 giờ của các thông số</p>
                        </div>
                        <RenderChart data={[...listNode]}/>   
                    </div>    
                </div>     
                <div className="col-md-6 col-sm-12 col-xs-12"> 
                    <div className="panel" >
                        <div className="panel-heading"> 
                            <p><b>Hanoi AQI:</b> Hanoi Real-time Air Quality Index (AQI).</p>
                        </div>
                        <ShowNodeComponent />
                    </div> 
                    
                </div>  
            </div>
            <div className="mt-5">
                <GoogleMapView />
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