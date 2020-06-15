import { Radius } from "./constants";

export interface LatLng
{
    longitude:number;
    latitude:number;
}

export interface Suggestion
{
    address:string;
    placeID:string;
    geoLocation:LatLng;
}
export interface Request
{
    address:string;
    geoFencing:number;
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
    geoLocation:LatLng;
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

export interface SuggestionProps
{
    suggestions:Suggestion[];
    setParentState:React.Dispatch<React.SetStateAction<LatLng>>
}

export interface GoogleSuggestions
{
    suggestions:Suggestion[];
    isSuccess:boolean;
    message:string;
}

export interface GoogleHospitals
{
    hospitals:Hospital[];
    isSuccess:boolean;
    message:string;
}