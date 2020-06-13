import React from 'react';
import { Table } from 'antd';
import { HospitalListHandler } from "../models/interfaces";
import '../App.css';


export default function HospitalList(receivedProps : HospitalListHandler) 
{
  const columns:any[] = [ {title: 'Name', dataIndex: 'name', key: 'name', } ];
  const isMatching:boolean = receivedProps.matchingHospital.length === 0;
  const message:string = receivedProps.showWelcomeScreen ? "Stay Safe" : "No Nearby Hospital";
  const hospitals:any = receivedProps.matchingHospital.map((item, index) => ({...item, key:index + 1}));
  const Message:JSX.Element = <h1 className="text-primary"> {message} </h1>;

  return (
    <div>

      { isMatching ? Message : <Table columns={columns} dataSource={hospitals} />  }

    </div>
  );
}
