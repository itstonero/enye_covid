const GoogleApiKey = "AIzaSyALQbAkgkiDS9chlu96Wqnr__TucA9NMfY";
const searchBy:string = "hospital";
export const geoLocation:string = "GEO_LOCATION";
export const geoRadius:string = "GEO_RADIUS";
export const geoPlaceID:string = "GEO_PLACE_ID";
export const geoQuery:string = "GEO_QUERY_STRING";

export enum Radius
{
    CLOSEBY = 10,
    REGION = 25,
    STATE = 50,
    METROPOLITAN = 100,
}

export interface GoogleApi
{
    placeIdEndpoint:string;
    geoLocationEndpoint:string;
    nearbyPlacesEndpoint:string;
}

export const GooglePlaces:GoogleApi = 
{
    placeIdEndpoint : `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${geoLocation}&radius=${geoRadius}&type=${searchBy}&key=${GoogleApiKey}`,
    geoLocationEndpoint : `https://maps.googleapis.com/maps/api/place/details/json?place_id=${geoPlaceID}&key=${GoogleApiKey}`,
    nearbyPlacesEndpoint : `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=input=${geoQuery}&inputtype=textquery&${GoogleApiKey}`,

}