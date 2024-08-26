import { ZPrizeInputStateI } from "zaions-react-ui-kit";
import { EBuildingType } from "../roomPreference"
import { EPlacePreference } from "@/types/roomPreference";
import { ILocation } from "../generic";

// Enums
export enum locationOptionEnum {
    searchPlace = 'searchPlace',
    selectCurrentLocation = 'selectCurrentLocation'
}

// Interfaces
export interface IPostingList {
    title?: string
    buildingType?: EBuildingType
    location?: string
    place?: EPlacePreference
    rentFee?: ZPrizeInputStateI
}

export interface ISearchLocation extends ILocation {
    // Just for frontend
    locationOption?: locationOptionEnum,
    searchPlace?: string,
}
