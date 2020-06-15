import React from 'react';
import { AppState } from "./models/interfaces";
import HospitalLists from "./components/hospitalLists";
import HospitalFinder from "./components/hospitalFinder";
import Header from "./components/header";
import './App.css';

function App() 
{
  const [state, setState] = React.useState<AppState>({showWelcomeScreen : true, nearByHospitals : []})
  
  return (
    <div className="row">

      <Header />

      <div className="col-4">
        <HospitalFinder state = { state } setParentState = { setState } />
      </div>

      <div className="col-8">
        <HospitalLists state = { state } showWelcome = { state.showWelcomeScreen }/>
      </div>

    </div>
  );
}

export default App;
