import React from 'react';
import Suggestions from "./suggestions";
import {InputLabel, TextField, MenuItem, FormControl, Select, makeStyles} from '@material-ui/core';
import { HospitalFinderProps, Request, LatLng, Suggestion } from "../models/interfaces";
import { GeoFencingRange } from '../models/constants';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

function HospitalFinder(props : HospitalFinderProps)
{
    const [state, setState] = React.useState<Request>({geoFencing:0, address:"", suggestion:[]})
    const [geoLocation, setGeoLocation] = React.useState<LatLng>({longitude:Infinity, latitude:Infinity});
    const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
    

    React.useEffect(()=>{
        if(geoLocation.longitude !== Infinity && state.geoFencing !== 0)
        {
            console.log(`The Selected Geolocation = ${JSON.stringify(geoLocation)}`)

            fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyALQbAkgkiDS9chlu96Wqnr__TucA9NMfY&query=${state.address}`)
            .then(res => res.json())
            .then(data => 
            {
                console.log(data);
                const searchResults = data.results.reduce((acc:any[], item:any) => [...acc, {address:item.name, geoLocation:item.geometry.location, placeID:item.place_id}],[]);
            })
            .catch(err => console.log(err));
        }
    },[geoLocation, state.geoFencing]);
    
    React.useEffect(()=>{
        if(state.address !== "")
        {
            fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyALQbAkgkiDS9chlu96Wqnr__TucA9NMfY&query=${state.address}`)
            .then(res => res.json())
            .then(data => 
            {
                const searchResults = data.results.reduce((acc:any[], item:any) => [...acc, {address:item.name, geoLocation:item.geometry.location, placeID:item.place_id}],[]);
                setSuggestions(searchResults);
            })
            .catch(err => console.log(err));
        }
    },[state.address]);

    const handleInput = (event : any) : void => setState({...state, [event.target.name]:event.target.value});

    const classes = useStyles();

  return (<div className="m-2">

    <FormControl className={classes.formControl}>
        <InputLabel id="radius">Geo Radius</InputLabel>
        <Select labelId="radius" name="geoFencing" value={ state.geoFencing } onChange={ handleInput } >
            { GeoFencingRange.map((range, index) => <MenuItem key={index} value={range}>{range} KM</MenuItem>)}
        </Select>
    </FormControl>

    <br />

    <FormControl>
        <TextField value={state.address} name="address" onChange={ handleInput } label="Location" type="search" />
    </FormControl>

    <br />
    <br />

    <Suggestions suggestions={ suggestions } setParentState={setGeoLocation}/>

  </div> );
}

export default HospitalFinder;