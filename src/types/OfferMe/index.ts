import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";
import { frequencyEnum } from "../generic";
import { ZPrizeInputStateI } from "zaions-react-ui-kit";
import { IPlace } from "../postingList";

// Interfaces
export interface IOfferMe {
    [FormFieldsEnum.rate]?: ZPrizeInputStateI,
    [FormFieldsEnum.frequency]?: frequencyEnum,
    [FormFieldsEnum.tenantsRequirement]?: string,
    // for frontend
    selectedPlace?: IPlace | null
    editRate?: boolean

}
