import React, { useState } from 'react';
import { AppState } from "../models/interfaces";
import HospitalList from "./HospitalList"
import HospitalFinder from "./HospitalFinder";
import '../App.css';

function App() 
{

    const [ state, appManager ] = useState<AppState>({ matchingHospitals : [], searchQuery : { radius:0, address:"" }, displayWelcome : true });

  return (
    <>

        <div className="row d-flex justify-content-center m-5">
            <HospitalFinder currentState = { state } AppManager = { appManager }/>
        </div>

        <div className="row d-flex justify-content-center m-5 align-items-center">
            <HospitalList matchingHospital = { state.matchingHospitals }  showWelcomeScreen = {state.displayWelcome}/> 
        </div>

    </>
  );
}

export default App;
