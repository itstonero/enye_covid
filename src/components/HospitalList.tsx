import React from 'react';
import { HospitalListHandler } from "../models/interfaces";
import HospitalTable from './Table';
import '../App.css';


export default function HospitalList(receivedProps : HospitalListHandler) 
{
  const isMatching:boolean = receivedProps.matchingHospital.length === 0;
  const message:string = receivedProps.showWelcomeScreen ? "Stay Safe" : "No Hospital Found...";
  const hospitals:any = receivedProps.matchingHospital.map((item, index) => ({...item, key:index + 1}));

  hospitals.push({name:"Owokoniran", id:"1"}, {name:"Ago Iwoyi Teaching Hospital", id:"2"}, {name:"LASUTH", id:"3"});

  return (
    <div className="d-flex justify-content-center "> 
    {
      !isMatching
      ?
      <h1 className="text-success display-1 font-weight-bold"> {message} </h1>
      :
      <HospitalTable hospitals = { hospitals }/>
    }  
    </div>
  );
}
