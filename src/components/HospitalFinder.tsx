import React, { useState, useEffect } from 'react';
import { HospitalFinderHandler, Request } from "../models/interfaces";
import { Radius, RadiusUnit, GoogleApiKey } from "../models/constants";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { getHospitals } from "../services/google";
import swal from "sweetalert";
import { GoogleComponent } from 'react-google-location' 
import '../App.css';
import { FormControl, FormLabel, FormGroup, LinearProgress } from '@material-ui/core';

const DELAY:number = 3000;

export default function HospitalFinder(props : HospitalFinderHandler) 
{
    const [state, setState ] = useState<Request>({ radius : Radius.CLOSEBY, address: "" , isRequesting: false, lastInput: Date.now()});
    

    useEffect(()=>
    {
        if(state.isRequesting)
        {
            getHospitals(state).then(matchingHospitals => 
            {
                //swal( "Oops" ,  "Something went wrong!" ,  "error" );
                setState({...state, isRequesting:false });
                props.AppManager({...props.currentState, matchingHospitals, displayWelcome:false});
            
            }).catch(err => setState({...state, isRequesting:false }));

    }}, [state, props])

    const handleInput = (event: any) : void => setState({...state, [event.target.name]: event.target.value });
    
    clearTimeout(state.lastInput);
    state.lastInput = setTimeout(()=>
    {
        if(state.address !== "") setState({...state, isRequesting:true});
    }, DELAY);



    return (
        <>

        <div className="d-flex justify-content-center">
            <FormGroup>
                <FormControl className="mt-5">   
                    <FormLabel className="text-secondary"> Radius </FormLabel> 
                    <Select className="bg-light" labelId="searchRadius" variant="filled" value={state.radius} name="radius" onChange = { handleInput }>
                        <MenuItem value={ Radius.CLOSEBY }> { Radius.CLOSEBY} { RadiusUnit }</MenuItem>
                        <MenuItem value={ Radius.REGION }> { Radius.REGION} { RadiusUnit }</MenuItem>
                        <MenuItem value={ Radius.STATE }> { Radius.STATE} { RadiusUnit }</MenuItem>
                        <MenuItem value={ Radius.METROPOLITAN }> { Radius.METROPOLITAN} { RadiusUnit }</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className="mt-5">
                    <TextField className="bg-light" label = "Enter Location" name="address" variant="filled" value={state.address} onChange = { handleInput }/>
                </FormControl>
            </FormGroup>
        </div>
        
        { state.isRequesting && <LinearProgress className="m-5"/>}
         
         <GoogleComponent
         
          apiKey={GoogleApiKey}
          language={'en'}
          country={'country:in|country:us'}
          coordinates={true}
          onChange={(e:any) => console.log(e)} 
          
          />

        </>
    );
}

