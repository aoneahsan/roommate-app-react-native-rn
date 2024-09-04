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
