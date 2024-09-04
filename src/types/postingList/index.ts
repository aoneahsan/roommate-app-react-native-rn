import { ZPrizeInputStateI } from "zaions-react-ui-kit";
import { EBuildingType } from "../roomPreference"
import { EPlacePreference } from "@/types/roomPreference";
import { frequencyEnum, ILocation } from "../generic";
import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";

// Enums
export enum locationOptionEnum {
    searchPlace = 'searchPlace',
    selectCurrentLocation = 'selectCurrentLocation'
}

export enum termEnum {
    shortTerm = 'shortTerm',
    longTerm = 'longTerm',
}

export enum privateSharedRoomEnum {
    bedroom = 'bedroom',
    livingRoom = 'livingRoom',
    kitchen = 'kitchen',
    washroom = 'washroom',
}

// Interfaces
export interface ISearchLocation extends ILocation {
    // Just for frontend
    locationOption?: locationOptionEnum,
    searchPlace?: string,
}
export interface IPLStepOne {
    [FormFieldsEnum.title]?: string
    [FormFieldsEnum.buildingType]?: EBuildingType | null
    [FormFieldsEnum.placePreference]?: EPlacePreference | null
    [FormFieldsEnum.rentFee]?: ZPrizeInputStateI | null
    [FormFieldsEnum.location]?: ISearchLocation | null
}

export interface IPLStepTwo {
    [FormFieldsEnum.bedroomImages]?: Array<string>
    [FormFieldsEnum.washroomImages]?: Array<string>
    [FormFieldsEnum.kitchenImages]?: Array<string>
    [FormFieldsEnum.otherImages]?: Array<string>

    // For Frontend
    bedroomImageFiles?: Array<File | null>
    washroomImageFiles?: Array<File | null>
    otherImageFiles?: Array<File | null>
}

export interface IPLStepThree {
    [FormFieldsEnum.moveInDate]?: string
    [FormFieldsEnum.moveOutDate]?: string
    [FormFieldsEnum.description]?: string
    [FormFieldsEnum.frequency]?: frequencyEnum
    [FormFieldsEnum.numOfBedroom]?: number
    [FormFieldsEnum.numOfParking]?: number
    [FormFieldsEnum.numOfWashroom]?: number
    [FormFieldsEnum.pets]?: boolean
    [FormFieldsEnum.smoke]?: boolean
    [FormFieldsEnum.furnished]?: boolean
    // For Frontend
    term?: termEnum | null
}

export interface IPostingList extends IPLStepOne, IPLStepTwo, IPLStepThree { }

