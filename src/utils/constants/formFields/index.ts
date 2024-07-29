import { RegisterFormFieldsEnum } from "@/enums/formData";
import { FormFieldType } from "zaions-tool-kit";

export const registerFormFields = {
    [RegisterFormFieldsEnum.name]: {
        type: FormFieldType.text,
    },
    [RegisterFormFieldsEnum.mobileNumber]: {
        type: FormFieldType.text,
    },
    [RegisterFormFieldsEnum.city]: {
        type: FormFieldType.text,
    },
    [RegisterFormFieldsEnum.country]: {
        type: FormFieldType.text,
    },
    [RegisterFormFieldsEnum.referralCode]: {
        type: FormFieldType.text,
    },
    [RegisterFormFieldsEnum.password]: {
        type: FormFieldType.password,
    },
    [RegisterFormFieldsEnum.passwordConfirmation]: {
        type: FormFieldType.password,
    },
}