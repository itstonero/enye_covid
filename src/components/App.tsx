import React, { useState } from 'react';
import { AppState } from "../models/state";
import HospitalList from "./HospitalList"
import HospitalFinder from "./HospitalFinder";
import './App.css';

function App() 
{
    const [ state, stateManager ] = useState<AppState>();

  return (
    <div className="row">
        <div className="col-3">
            <HospitalFinder state = { state } stateManager = { stateManager }/>
        </div>

        <div className="col-9">
            <HospitalList state = { state } stateManager = { stateManager }/>
        </div>

    </div>
  );
}

export default App;
