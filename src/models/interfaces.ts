import { Radius } from "./constants";

export interface LatLng
{
    longitude:number;
    latitude:number;
}

export interface Request
{
    geoLocation:LatLng;
    geoFencing:Radius;
}

export interface Place
{
    name:string;
    id:string;
}

export interface Hospital
{
    name:string;
    id:string;
}

export interface AppState
{
    showWelcomeScreen:boolean;
    nearByHospitals:Hospital[];
}

export interface HospitalFinderProps
{
    state:AppState;
    setParentState:React.Dispatch<React.SetStateAction<AppState>>
}

export interface HospitalListProps
{
    state:AppState;
    showWelcome:boolean;
}

