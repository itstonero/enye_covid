import React, { useState } from 'react';
import { AppState } from "../models/state";
import HospitalList from "./HospitalList"
import HospitalFinder from "./HospitalFinder";
import './App.css';

function App() 
{
    const [ state, appManager ] = useState<AppState>();

  return (
    <div className="row">
        <div className="col-3">
            <HospitalFinder state = { state } AppManger = { appManager }/>
        </div>

        <div className="col-9">
            { 
                state?.isSearching 
                ? "Searching For Hospital" 
                :  <HospitalList state = { state } AppManager = { appManager }/> 
            }
        </div>

    </div>
  );
}

export default App;
