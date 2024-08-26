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
