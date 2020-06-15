import React from 'react';
import { HospitalListProps } from "../models/interfaces";

function HospitalList(props:HospitalListProps)
{
  const Message:JSX.Element = <h1> Stay Safe </h1>;



  return (
    <>
    { props.showWelcome  && Message }
    
    { !props.showWelcome && 
      <div>
        Table Goes Here Now...
      </div>}
    </>
  );
}

export default HospitalList;
