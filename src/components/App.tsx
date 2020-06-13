import React, { useState } from 'react';
import { AppState } from "../models/interfaces";
import HospitalList from "./HospitalList"
import HospitalFinder from "./HospitalFinder";
import '../App.css';
import { Radius } from '../models/constants';

function App() 
{

  const [ state, appManager ] = useState<AppState>({ 
    matchingHospitals : [], 
    searchQuery : { radius: Radius.CLOSEBY, address:"" }, 
    displayWelcome : true 
  });
  
  const hospitalFinder = <HospitalList matchingHospital = { state.matchingHospitals }  showWelcomeScreen = {state.displayWelcome}/>;
  const hospitalList = <HospitalFinder currentState = { state } AppManager = { appManager }/>;

  return (
    <React.Fragment>

        <div className="row d-flex justify-content-center m-5"> { hospitalFinder } </div>
        <div className="row d-flex justify-content-center m-5 align-items-center"> { hospitalList } </div>

    </React.Fragment>
  );

}

export default App;
