
import { Hospital, Locator } from "../models/interfaces";
import { GooglePlaces, GoogleHeaders, geoLocation, geoPlaceID, geoQuery, geoRadius } from "../models/constants";

const getQueryPlaceID = async (searchParam : string ):Promise<Response> =>
{
    const placeURL:string = GooglePlaces.placeIdEndpoint.replace(geoQuery, searchParam);

    const placeResponse:Response = await fetch(placeURL, GoogleHeaders )
    .then(data => data.json().then(res => res).catch(err => ({status: "FAIL"})))
    .catch(err => ({status: "FAIL"}));

    return placeResponse;
}

const getQueryGeographicCoordinates = async (placeID : string ) : Promise<Response> => 
{
        const retrieveGeoLocationURL = GooglePlaces.geoLocationEndpoint.replace(geoPlaceID, placeID);

        const geoLocator:Response = await fetch(retrieveGeoLocationURL, GoogleHeaders)
        .then(data => data.json().then(res => res).catch(err => ({status: "FAIL"})))
        .catch(err => ({status: "FAIL"}));

        return geoLocator;
}

const retrieveMatchingHospitals = async (location:any, radius:number) : Promise<Hospital[]> => 
{
    const response:Hospital[] = [];
    let placesNearByURL:string = GooglePlaces.nearbyPlacesEndpoint.replace(geoLocation, `${location.lat},${location.lng}`);            
    placesNearByURL = placesNearByURL.replace(geoRadius, `${radius}`);

    const hospitalsLocated:any = await fetch(placesNearByURL, GoogleHeaders)
    .then(data => data.json().then(res => res).catch(err => ({status: "FAIL"})))
    .catch(err => ({status: "FAIL"}));

    if(hospitalsLocated?.status !== "OK") return response;

    for(let response of hospitalsLocated.results)
    {
        response.push({ id:response.id, name:response.name });
    }

    return response;
}

export async function getHospitals(searchParam:Locator) : Promise<Hospital[]>
{
    
    let response:Hospital[] = [];
    const queryPlaceResponse:any = await getQueryPlaceID(searchParam.address);

    if(queryPlaceResponse?.status !== "OK") return response;

    const receivedPlaceID = queryPlaceResponse.candidates[0].place_id;
    const geoCoordinatesResponse:any = await getQueryGeographicCoordinates(receivedPlaceID);

    if(geoCoordinatesResponse?.status !== "OK") return response;

    const location:any = geoCoordinatesResponse.geometry.location;
    return await retrieveMatchingHospitals(location, searchParam.radius);
}