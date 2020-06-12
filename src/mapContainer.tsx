import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles:any = {
    width:"100%",
    height:"100%"
}


export function MapContainer(props:any)
{
    return(
        <Map google={props.google} /*zoom = {14}*/ style={mapStyles} initialCenter={{ lat: -1.2884, lng: 36.8233}} />
    );
}

export default GoogleApiWrapper({ apiKey:"AIzaSyALQbAkgkiDS9chlu96Wqnr__TucA9NMfY" })(MapContainer);