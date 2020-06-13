import React, { useState, useEffect } from 'react';
import { Select, Input, Button } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { HospitalFinderHandler, Request } from "../models/interfaces";
import { Radius } from "../models/enums";
import { getHospitals } from "../services/google";
import swal from 'sweetalert';
import '../App.css';

const { Option } = Select;

export default function HospitalFinder(receivedProps : HospitalFinderHandler) 
{
    let searchParams:boolean = false;
    const [searchQuery, hospitalFinderManager ] = useState<Request>({ radius : Radius.CLOSEBY, address: "" });

    useEffect(()=>
    {
        if(searchParams)
        {
            getHospitals(searchQuery).then(matchingHospitals => 
            {
                receivedProps.AppManager({...receivedProps.currentState, searchQuery, matchingHospitals})
            });
        }
    }, [])

    const handleAddress = (event : any):void =>
    {
        hospitalFinderManager({...searchQuery, address: event.target.value });
        searchParams = !searchParams && true;
    }

    const handleRadius = (radius:Radius):void =>
    {
        hospitalFinderManager({...searchQuery, radius });
        searchParams = !searchParams && true;    
    }

    return (
        <div className="d-flex text-center">
            <Input 
                value={searchQuery.address}
                placeholder="Enter Address..."
                onChange={ handleAddress }
            />

            <Select defaultValue={searchQuery.radius} className="ml-4" style={{ width: 200 }} onChange={handleRadius}>
                <Option value={Radius.CLOSEBY}>10km</Option>
                <Option value={Radius.REGION}>25km</Option>
                <Option value={Radius.STATE}>50km</Option>
                <Option value={Radius.METROPOLITAN}>100km</Option>
            </Select>

            <Button type="primary" shape="round" className="ml-4" icon={<SearchOutlined />}>
                Search
            </Button>
        </div>
    );
}

