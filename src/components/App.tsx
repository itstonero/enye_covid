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
  const header = "Help Flatten the Curve";
  const hospitalFinder = <HospitalList matchingHospital = { state.matchingHospitals }  showWelcomeScreen = {state.displayWelcome}/>;
  const hospitalList = <HospitalFinder currentState = { state } AppManager = { appManager }/>;

  return (
    <>
      <div className="bg-dark text-center text-white-50 font-italic p-3 ">  
        <span className="display-2 font-weight-bold"> { header } </span>
        <h3 className="text-white">  --- Search For Hospitals Around You --- </h3>
      </div>

      <div className="row m-3">
        <div className="col-3"> <div> { hospitalList } </div> </div>
        <div className="col-8"> <div> { hospitalFinder } </div> </div>
      </div>
    </>
  );

}

export default App;
