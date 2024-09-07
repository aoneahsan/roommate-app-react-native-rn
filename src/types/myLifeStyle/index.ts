import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";
import { ECleanlinessType, EFoodPreferenceType, EGuestsType, EOccupationType, EPetsType, ESmokeType, EWorkScheduleType } from "../preference";

// Interface
export interface IMyLifeStyle {
    [FormFieldsEnum.cleanliness]?: ECleanlinessType
    [FormFieldsEnum.smoke]?: ESmokeType
    [FormFieldsEnum.pets]?: EPetsType
    [FormFieldsEnum.guests]?: EGuestsType
    [FormFieldsEnum.occupation]?: EOccupationType
    [FormFieldsEnum.foodPreference]?: EFoodPreferenceType
    [FormFieldsEnum.workSchedule]?: EWorkScheduleType
}