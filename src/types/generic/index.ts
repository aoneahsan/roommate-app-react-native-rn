import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";

// Enums
export enum ZFormModeE {
    edit = 'edit',
    add = 'add',
}

export interface ILocationLatLng {
    lat: number;
    lng: number;
}

export enum fileErrorEnum {
    sizeTooLarge = 'size-too-large'
}

export enum frequencyEnum {
    monthly = 'monthly',
    yearly = 'yearly',
    weekly = 'weekly',
}

export enum agreementStatusEnum {
    yes = 'yes',
    no = 'no',
    negotiated = 'negotiated',
}

export enum privateShareEnum {
    private = 'private',
    share = 'share',
}

export enum rentInclusionsEnum {
    wifi = 'wifi',
    dishWash = 'dishWash',
    tv = 'tv',
    heater = 'heater',
    closet = 'closet',
    water = 'water',
    balcony = 'balcony',
    personalEnter = 'personalEnter',
    electric = 'electric',
    laundry = 'laundry',
    security = 'security',
    parking = 'parking',
}

export enum ZRQGetRequestExtractEnum {
    extractPage = 'extractPage',
    extractData = 'extractData',
    extractItems = 'extractItems',
    extractItem = 'extractItem',
    extractUsers = 'extractUsers',
}

export enum ZRQUpdaterAction {
    add = 'add',
    replace = 'replace',
    updateWhole = 'updateWhole',
    delete = 'delete'
}


// Interfaces
export interface ILocation {
    [FormFieldsEnum.country]?: string
    [FormFieldsEnum.streetAddress]?: string,
    [FormFieldsEnum.aptSuit]?: string,
    [FormFieldsEnum.city]?: string,
    [FormFieldsEnum.province]?: string,
    [FormFieldsEnum.postCode]?: string,
    [FormFieldsEnum.formattedAddress]?: string,
}
