import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum"
import { ZRUSelectValueI } from "zaions-react-ui-kit"

// Enums
export enum EPlacePreference {
    entirePlace = 'entirePlace',
    sharedPlace = 'sharedPlace'
}

export enum EBuildingType {
    noPreference = 'noPreference',
    condo = 'condo',
    apartment = 'apartment',
    twonHouse = 'twonHouse',
    house = 'house',
    basement = 'basement',
}

// Interface
export interface IRoomPreference {
    [FormFieldsEnum.desiredPlace]?: Partial<ZRUSelectValueI> | null,
    [FormFieldsEnum.moveInDate]?: string
    [FormFieldsEnum.placePreference]?: EPlacePreference
    [FormFieldsEnum.buildingType]?: EBuildingType
    [FormFieldsEnum.maxBudget]?: number
    [FormFieldsEnum.minBudget]?: number
}