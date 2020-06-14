import React from 'react';
import { HospitalListHandler } from "../models/interfaces";
import HospitalTable from './Table';
import '../App.css';


export default function HospitalList(receivedProps : HospitalListHandler) 
{
  const isMatching:boolean = receivedProps.matchingHospital.length === 0;
  const message:string = receivedProps.showWelcomeScreen ? "Stay Safe" : "No Nearby Hospital";
  const hospitals:any = receivedProps.matchingHospital.map((item, index) => ({...item, key:index + 1}));
  const Message:JSX.Element = <h1 className="text-primary"> {message} </h1>;

  return (
    <div> <HospitalTable /> </div>
  );
}
