import React, { useState, useEffect } from 'react';
import { Select, Input } from "antd";
import { HospitalFinderHandler, Request, Hospital } from "../models/interfaces";
import { Radius } from "../models/enums";
import { getHospitals } from "../services/google";
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

    const handleRadius = (radius:any):void =>
    {
        hospitalFinderManager({...searchQuery, radius });
        searchParams = !searchParams && true;    
    }

    return (
        <div>
            <Input 
                value={searchQuery.address}
                placeholder="Enter Address..."
                onChange={ handleAddress }
            />

            <Select defaultValue={searchQuery.radius} style={{ width: 200 }} onChange={handleRadius}>
                <Option value={Radius.CLOSEBY}>10km</Option>
                <Option value={Radius.REGION}>25km</Option>
                <Option value={Radius.STATE}>50km</Option>
                <Option value={Radius.METROPOLITAN}>100km</Option>
            </Select>
        </div>
    );
}

const googleResponse:any = 
{
    "html_attributions": [],
    "result": {
       "address_components": [
          {
             "long_name": "Ewusi Street",
             "short_name": "Ewusi Street",
             "types": [
                "route"
             ]
          },
          {
             "long_name": "Sagamu",
             "short_name": "Sagamu",
             "types": [
                "locality",
                "political"
             ]
          },
          {
             "long_name": "Shagamu",
             "short_name": "Shagamu",
             "types": [
                "administrative_area_level_2",
                "political"
             ]
          },
          {
             "long_name": "Ìpínlẹ̀ Ògùn",
             "short_name": "OG",
             "types": [
                "administrative_area_level_1",
                "political"
             ]
          },
          {
             "long_name": "Nigeria",
             "short_name": "NG",
             "types": [
                "country",
                "political"
             ]
          }
       ],
       "adr_address": "<span class=\"street-address\">Ewusi Street</span>, <span class=\"locality\">Sagamu</span>, <span class=\"country-name\">Nigeria</span>",
       "formatted_address": "Ewusi Street, Sagamu, Nigeria",
       "geometry": {
          "location": {
             "lat": 6.8502443,
             "lng": 3.6403334
          },
          "viewport": {
             "northeast": {
                "lat": 6.851593280291502,
                "lng": 3.641682380291503
             },
             "southwest": {
                "lat": 6.848895319708498,
                "lng": 3.638984419708498
             }
          }
       },
       "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
       "id": "91f701dba13f277883c1f08778b8b89d031b67a9",
       "name": "Ewusi Street",
       "place_id": "ChIJnR8xQrjbOxAR_NJyoDly0AA",
       "reference": "ChIJnR8xQrjbOxAR_NJyoDly0AA",
       "scope": "GOOGLE",
       "types": [
          "route"
       ],
       "url": "https://maps.google.com/?q=Ewusi+Street,+Sagamu,+Nigeria&ftid=0x103bdbb842311f9d:0xd07239a072d2fc",
       "utc_offset": 60,
       "vicinity": "Sagamu"
    },
    "status": "OK"
 }

 function trial()
 {
    if(googleResponse.status == "OK")
    {
        let location = googleResponse.result.geometry.location;
        let l = `location=${location.lat},${location.lng}&radius=${}&key=${GoogleApiKey}`
        //location=-33.8670522,151.1957362&radius=1500&type=hospital&key=GOOGLE_API_KEY
    }
 }