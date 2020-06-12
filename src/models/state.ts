import { Hospital } from "./hospital";
import { Locator } from "./locator";

export interface AppState
{
    matchingHospitals:Hospital[];
    searchQuery:Locator;
    isSearching:boolean;
}
