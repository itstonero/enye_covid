import { Radius } from "./constants";

export interface Hospital
{
    name:string;
    id:string;
}
export interface Locator
{
    address:string;
    radius:Radius;
}
export interface Request
{
    address:string;
    radius:Radius;
    isRequesting:boolean;
}
export interface AppState
{
    matchingHospitals:Hospital[];
    searchQuery:Locator;
    displayWelcome:boolean;
}
export interface HospitalListHandler
{
    matchingHospital:Hospital[];
    showWelcomeScreen:boolean;
}
export interface HospitalFinderHandler
{
    currentState:AppState;
    AppManager : React.Dispatch<React.SetStateAction<AppState>>;
}