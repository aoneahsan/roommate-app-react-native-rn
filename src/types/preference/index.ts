import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";

// enums
export enum ECleanlinessType {
    superClean = 'superClean',
    clean = 'clean',
    lessClean = 'lessClean',
    normalClean = 'normalClean',
}

export enum ESmokeType {
    no = 'no',
    yes = 'yes',
    other = 'other',
}

export enum EPetsType {
    no = 'no',
    yes = 'yes',
    dependsOnThePet = 'dependsOnThePet',
}

export enum EGuestsType {
    no = 'no',
    yes = 'yes',
    occasionally = 'occasionally',
}

export enum EOccupationType {
    student = 'student',
    haveWork = 'haveWork',
    other = 'other',
}

export enum EFoodPreferenceType {
    vegan = 'vegan',
    vegetarian = 'vegetarian',
    other = 'other',
}

export enum EWorkScheduleType {
    dayTime = 'dayTime',
    nightTime = 'nightTime',
    other = 'other',
}

export enum EGenderType {
    male = 'male',
    female = 'female',
    nonBinary = 'nonBinary',
    all = 'all',
}

// Interfaces
export interface IRoommatesPreference {
    [FormFieldsEnum.gender]?: EGenderType
    [FormFieldsEnum.smoke]?: ESmokeType
    [FormFieldsEnum.pets]?: EPetsType
    [FormFieldsEnum.guests]?: EGuestsType
    [FormFieldsEnum.cleanliness]?: ECleanlinessType
    [FormFieldsEnum.others]?: string
}