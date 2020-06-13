import React from 'react';
import { HospitalListHandler } from "../models/interfaces";
import '../App.css';
import { Table } from 'antd';

const columns:any[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',

  },
];

export default function HospitalList(receivedProps : HospitalListHandler) 
{
  const message = receivedProps.showWelcomeScreen ? "Stay Safe" : "No Nearby Hospital";
  const hospitals:any = receivedProps.matchingHospital.map((item, index) => ({...item, key:index + 1}));
  const Message = <h1 className="text-primary"> {message} </h1>;

  return (
    <div>
      
      { 
        receivedProps.matchingHospital.length === 0
        ?
        Message
        :
        <Table columns={columns} dataSource={hospitals} />
      }
    </div>
  );
}
