import React, { useState, useEffect } from 'react';
import { HospitalFinderHandler, Request } from "../models/interfaces";
import { Radius, RadiusUnit } from "../models/constants";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { getHospitals } from "../services/google";
import '../App.css';


export default function HospitalFinder(receivedProps : HospitalFinderHandler) 
{
    const [searchQuery, hospitalFinderManager ] = useState<Request>({ radius : Radius.CLOSEBY, address: "" , isRequesting: false});

    useEffect(()=>
    {
        if(searchQuery.isRequesting)
        {
            getHospitals(searchQuery).then(matchingHospitals => 
            {
                hospitalFinderManager({...searchQuery, isRequesting:false });
                receivedProps.AppManager({...receivedProps.currentState, searchQuery, matchingHospitals, displayWelcome:false});
            }).catch(err => 
            {
                console.log(err);
                hospitalFinderManager({...searchQuery, isRequesting:false });
            });
        }
    }, [searchQuery.isRequesting])

    const handleInput = (event: any) : void => hospitalFinderManager({...searchQuery, [event.target.name]: event.target.value });
    const handleSearch = ():void => hospitalFinderManager({...searchQuery, isRequesting:true });
    
    return (

        <div className="d-flex text-center mt-5">

                <Select labelId="searchRadius" variant="filled" value={searchQuery.radius} name="radius" onChange = { handleInput }>
                    <MenuItem value={ Radius.CLOSEBY }> { Radius.CLOSEBY} { RadiusUnit }</MenuItem>
                    <MenuItem value={ Radius.REGION }> { Radius.REGION} { RadiusUnit }</MenuItem>
                    <MenuItem value={ Radius.STATE }> { Radius.STATE} { RadiusUnit }</MenuItem>
                    <MenuItem value={ Radius.METROPOLITAN }> { Radius.METROPOLITAN} { RadiusUnit }</MenuItem>
                </Select>
                
                <TextField label="Location ....." name="address" variant="filled" value={searchQuery.address} onChange = { handleInput }/>

        </div>
    );
}

