
import { Hospital, Locator } from "../models/interfaces";
import { GooglePlaces, geoLocation, geoPlaceID, geoQuery, geoRadius } from "../models/enums";

export async function getHospitals(searchParam:Locator) : Promise<Hospital[]>
{
    let matchingHospital:Hospital[] = [];

    const placeURL:string = GooglePlaces.placeIdEndpoint.replace(geoQuery, searchParam.address);
    const placeResponse:any = await fetch(placeURL).then(data => data.json());
    let isSuccess:boolean = placeResponse?.status == "OK";

    if(isSuccess)
    {
        const retrieveGeoLocationURL = GooglePlaces.geoLocationEndpoint.replace(geoPlaceID, placeResponse.candidates[0].place_id);
        const geoLocation:any = await fetch(retrieveGeoLocationURL).then(data => data.json);
        isSuccess = geoLocation?.status == "OK";

        if(isSuccess)
        {
            let location:any = geoLocation.geometry.location;
            let placesNearByURL:string = GooglePlaces.nearbyPlacesEndpoint.replace(geoLocation, `${location.lat},${location.lng}`);            
            placesNearByURL = placesNearByURL.replace(geoRadius, `${searchParam.radius}`);
            
            const hospitalsLocated:any = await fetch(placesNearByURL).then(data => data.json);
            isSuccess = hospitalsLocated?.status == "OK";

            if(isSuccess)
            {
                matchingHospital = convertGooglePlaceToHospitals(hospitalsLocated.results);
            }
        }

    }

    return matchingHospital;
}

function convertGooglePlaceToHospitals(payload:any):Hospital[]
{
    if(!Array.isArray(payload)) return [];

    let allHospital:Hospital[] = [];

    for(let response of payload)
    {
        allHospital.push({ id:response.id, name:response.name });
    }

    return allHospital;
}