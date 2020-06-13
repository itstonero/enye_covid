import React, { useState, useEffect } from 'react';
import { Select, Input, Button, Spin } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { HospitalFinderHandler, Request } from "../models/interfaces";
import { Radius, RadiusUnit } from "../models/constants";
import swal from "sweetalert";
import { getHospitals } from "../services/google";
import '../App.css';

const { Option } = Select;

export default function HospitalFinder(receivedProps : HospitalFinderHandler) 
{
    const [searchQuery, hospitalFinderManager ] = useState<Request>({ radius : Radius.CLOSEBY, address: "" , isRequesting: false});

    useEffect(()=>
    {
        if(searchQuery.isRequesting)
        {
            getHospitals(searchQuery).then(matchingHospitals => 
            {
                hospitalFinderManager({...searchQuery, isRequesting:false });
                receivedProps.AppManager({...receivedProps.currentState, searchQuery, matchingHospitals, displayWelcome:false});
            }).catch(err => 
            {
                console.log(err);
                hospitalFinderManager({...searchQuery, isRequesting:false });
            });
        }
    }, [searchQuery.isRequesting])

    const handleAddress = (event : any):void => hospitalFinderManager({...searchQuery, address: event.target.value });
    const handleRadius = (radius:Radius):void => hospitalFinderManager({...searchQuery, radius });
    const handleSearch = ():void => hospitalFinderManager({...searchQuery, isRequesting:true });

    const searchButton = <Button type="primary" shape="round" onClick={handleSearch} icon={<SearchOutlined />}> Search </Button>;
    
    return (

        <div className="d-flex text-center">

            <Input value={searchQuery.address} placeholder="Enter Address..."  onChange={ handleAddress }  />

            <Select defaultValue={searchQuery.radius} className="ml-4 mr-4" style={{ width: 200 }} onChange={handleRadius}>
                <Option value={Radius.CLOSEBY}>{Radius.CLOSEBY} {RadiusUnit}</Option>
                <Option value={Radius.REGION}>{Radius.REGION} {RadiusUnit}</Option>
                <Option value={Radius.STATE}>{Radius.STATE} {RadiusUnit}</Option>
                <Option value={Radius.METROPOLITAN}>{Radius.METROPOLITAN} {RadiusUnit}</Option>
            </Select>

            { searchQuery.isRequesting  ? <Spin size="large" /> : searchButton }

        </div>
    );
}

