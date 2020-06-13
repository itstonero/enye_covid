import React from 'react';
import { HospitalListHandler } from "../models/interfaces";
import '../App.css';
import { Table } from 'antd';

const columns:any = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',

  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
];

export default function HospitalList(receivedProps : HospitalListHandler) 
{
  const message = receivedProps.showWelcomeScreen ? "Stay Safe" : "No Matching Hospital";
  const hospitals:any = receivedProps.matchingHospital.map((item, index) => ({...item, key:index + 1}));

  return (
    <div>
      { 
        receivedProps.matchingHospital.length === 0
        ?
        message
        :
        <Table columns={columns} dataSource={hospitals} />
      }
    </div>
  );
}
