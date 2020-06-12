import React from 'react';
import './App.css';


export default function HospitalList({ state, stateManager }) 
{

  return (
    <div>
        { state }
        <br />
        { stateManager }
    </div>
  );
}
