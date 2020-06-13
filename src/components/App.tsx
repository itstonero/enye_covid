import React, { useState } from 'react';
import { AppState } from "../models/interfaces";
import HospitalList from "./HospitalList"
import HospitalFinder from "./HospitalFinder";
import '../App.css';

function App() 
{

    const [ state, appManager ] = useState<AppState>({ matchingHospitals : [], searchQuery : { radius:0, address:"" }, displayWelcome : true });

  return (
    <div className="row container d-flex">

        <div className="col-3">
            <HospitalFinder currentState = { state } AppManager = { appManager }/>
        </div>

        <div className="col-9">
            <HospitalList matchingHospital = { state.matchingHospitals }  showWelcomeScreen = {state.displayWelcome}/> 
        </div>

    </div>
  );
}

export default App;
