import { ZPrizeInputStateI } from "zaions-react-ui-kit";
import { EBuildingType } from "../roomPreference"
import { EPlacePreference } from "@/types/roomPreference";

// Interfaces
export interface IPostingList {
    title?: string
    buildingType?: EBuildingType
    location?: string
    place?: EPlacePreference
    rentFee?: ZPrizeInputStateI
}
