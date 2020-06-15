import React from 'react';
import Suggestions from "./suggestions";
import {InputLabel, TextField, MenuItem, FormControl, Select, makeStyles} from '@material-ui/core';

import { HospitalFinderProps, Request, LatLng, Suggestion, GoogleHospitals, GoogleSuggestions } from "../models/interfaces";
import { getGoogleHospitals, getGoogleSuggestion } from "../services/googlePlaces";
import swal from "sweetalert";
import { GeoFencingRange } from '../models/constants';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
}));


function HospitalFinder(props : HospitalFinderProps)
{
    const [state, setState] = React.useState<Request>({geoFencing:0, address:""})
    const [geoLocation, setGeoLocation] = React.useState<LatLng>({longitude:Infinity, latitude:Infinity});
    const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
    const classes = useStyles();

    React.useEffect(()=>{
        if(geoLocation.longitude !== Infinity && state.geoFencing !== 0)
        {
            const googleHospitals:GoogleHospitals = getGoogleHospitals(state.geoFencing, geoLocation);
            if(googleHospitals.isSuccess)
            {
                props.setParentState({...props.state, showWelcomeScreen:false, nearByHospitals:googleHospitals.hospitals});
                if(googleHospitals.message !== "OK")
                {
                    swal("Usage", googleHospitals.message, "warning");
                }
            }else
            {
                swal("Failure", googleHospitals.message, "error");
            }
        }
    },[geoLocation, state.geoFencing]);
    
    React.useEffect(()=>{
        if(state.address !== "")
        {
            const googleSuggestions:GoogleSuggestions = getGoogleSuggestion(state.address);
            if(googleSuggestions.isSuccess)
            {
                setSuggestions(googleSuggestions.suggestions);
                if(googleSuggestions.message !== "OK")
                {
                    swal("Usage", googleSuggestions.message, "warning");
                }
            }else
            {
                swal("Failure", googleSuggestions.message, "error");
            }
        }
    },[state.address]);

    const handleInput = (event : any) : void => setState({...state, [event.target.name]:event.target.value});


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