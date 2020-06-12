import React, { useState } from 'react';
import { AppState } from "../models/state";
import { Hospital } from "../models/hospital";
import { Locator } from "../models/locator";
import { Request } from "../models/request";
import { getHospitals } from "../services/google";
import './App.css';

export default function HospitalFinder({ state, AppManager }) 
{
    const [request, hospitalFinderManager ] = useState<Request>();

    const processRequest = (request:Request):void =>
    {
        let param:Locator = {address : request.address, longitude:0, latitude:0, radius:request.radius };

        let matchingHospitals:Hospital[] = getHospitals(param);

        let newState:AppState = {...state, matchingHospitals};

        AppManager(newState);
    }

    const requestManager = (event : any):void =>
    {
        let newState:Request;
        if(!request)
        {
            newState = { [event.target.name]:event.target.value };
        }else
        {
            newState = {...request, [event.target.name]:event.target.value };
        }

        hospitalFinderManager(newState);
    }

  return (
    <div>
    </div>
  );
}
