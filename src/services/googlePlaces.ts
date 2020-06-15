import { GoogleHospitals, GoogleSuggestions, LatLng } from "../models/interfaces";
import { GoogleAPI } from "../models/constants";

export function getGoogleSuggestion(address:string): GoogleSuggestions
{
    const response:GoogleSuggestions = { isSuccess : true, message : "OK", suggestions:[]};

    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?key=${GoogleAPI}&query=${address}`)
    .then(res => res.json())
    .then(data => 
    {
        response.suggestions = data.results.reduce((acc:any[], item:any) => [...acc, {address:item.name, geoLocation:item.geometry.location, placeID:item.place_id}],[]);
    })
    .catch(err => {
        response.isSuccess = false;
        response.message = "Failed To Communicate With Google...";
    });

    return response;
}


export function getGoogleHospitals(radius:number, location:LatLng) : GoogleHospitals
{
    const response:GoogleHospitals = { isSuccess : true, message : "OK", hospitals:[]};

    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${GoogleAPI}&location=${location.latitude},${location.longitude}&radius=${radius}&type=hospital`)
    .then(res => res.json())
    .then(data => 
    {
        console.log(data);
    })
    .catch(err => {
        response.isSuccess = false;
        response.message = "Failed To Communicate With Google...";
    });

    return response;
}