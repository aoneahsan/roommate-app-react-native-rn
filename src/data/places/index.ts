import { agreementStatusEnum, frequencyEnum, privateShareEnum, rentInclusionsEnum } from "@/types/generic";
import { IPlace } from "@/types/postingList";
import { EBuildingType, EPlacePreference } from "@/types/roomPreference";
import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";
import { defaultCurrency } from "zaions-react-ui-kit";


const ZPlacesData: Array<IPlace> = [
    {
        [FormFieldsEnum.id]: '1',
        [FormFieldsEnum.title]: 'Furnished masterbedroom fr female near Sheridan College',
        [FormFieldsEnum.buildingType]: EBuildingType.apartment,
        [FormFieldsEnum.placePreference]: EPlacePreference.sharedPlace,
        [FormFieldsEnum.rentFee]: {
            currency: defaultCurrency,
            prize: '200'
        },
        [FormFieldsEnum.moveInDate]: 'October 1, 2020',
        [FormFieldsEnum.moveOutDate]: 'October 1, 2021',
        [FormFieldsEnum.description]: 'lorem lorem lorem lorem lorem lorem lorem',
        [FormFieldsEnum.frequency]: frequencyEnum.monthly,
        [FormFieldsEnum.numOfBedroom]: 4,
        [FormFieldsEnum.numOfParking]: 1,
        [FormFieldsEnum.numOfWashroom]: 4,
        [FormFieldsEnum.pets]: agreementStatusEnum.negotiated,
        [FormFieldsEnum.smoke]: agreementStatusEnum.no,
        [FormFieldsEnum.furnished]: agreementStatusEnum.no,
        [FormFieldsEnum.bedroom]: privateShareEnum.private,
        [FormFieldsEnum.livingRoom]: privateShareEnum.share,
        [FormFieldsEnum.kitchen]: privateShareEnum.share,
        [FormFieldsEnum.washroom]: privateShareEnum.private,
        [FormFieldsEnum.livingWithLandlord]: agreementStatusEnum.no,
        [FormFieldsEnum.rentInclude]: [rentInclusionsEnum.balcony, rentInclusionsEnum.dishWash, rentInclusionsEnum.water],
        [FormFieldsEnum.otherInclude]: 'lorem lorem lorem lorem lorem lorem lorem'
    },

    {
        [FormFieldsEnum.id]: '2',
        [FormFieldsEnum.title]: 'Example',
        [FormFieldsEnum.buildingType]: EBuildingType.condo,
        [FormFieldsEnum.placePreference]: EPlacePreference.entirePlace,
        [FormFieldsEnum.rentFee]: {
            currency: defaultCurrency,
            prize: '600'
        },
        [FormFieldsEnum.moveInDate]: 'January 1, 2022',
        [FormFieldsEnum.moveOutDate]: 'September 1, 2022',
        [FormFieldsEnum.description]: 'lorem lorem lorem lorem lorem lorem lorem',
        [FormFieldsEnum.frequency]: frequencyEnum.weekly,
        [FormFieldsEnum.numOfBedroom]: 2,
        [FormFieldsEnum.numOfParking]: 2,
        [FormFieldsEnum.numOfWashroom]: 2,
        [FormFieldsEnum.pets]: agreementStatusEnum.negotiated,
        [FormFieldsEnum.smoke]: agreementStatusEnum.yes,
        [FormFieldsEnum.furnished]: agreementStatusEnum.yes,
        [FormFieldsEnum.bedroom]: privateShareEnum.private,
        [FormFieldsEnum.livingRoom]: privateShareEnum.private,
        [FormFieldsEnum.kitchen]: privateShareEnum.private,
        [FormFieldsEnum.washroom]: privateShareEnum.private,
        [FormFieldsEnum.livingWithLandlord]: agreementStatusEnum.no,
        [FormFieldsEnum.rentInclude]: [rentInclusionsEnum.balcony, rentInclusionsEnum.dishWash, rentInclusionsEnum.water],
        [FormFieldsEnum.otherInclude]: 'lorem lorem lorem lorem lorem lorem lorem'
    },
];


export default ZPlacesData