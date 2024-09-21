import { RegisterFormFieldsEnum, ResetPasswordFormFieldsEnum } from "@/enums/formData";
import { ZWithdrawOptionE } from "../user";

// Enums
export enum ZResetPasswordStepE {
    provideNumber = 'provideNumber',
    confirmVerificationCode = 'confirmVerificationCode',
    updatePassword = 'updatePassword'
}

// Interfaces
export interface ZRegisterI {
    [RegisterFormFieldsEnum.name]?: string
    [RegisterFormFieldsEnum.email]?: string
    [RegisterFormFieldsEnum.phoneNumber]?: string
    [RegisterFormFieldsEnum.city]?: string
    [RegisterFormFieldsEnum.country]?: string
    [RegisterFormFieldsEnum.referralCode]?: string
    [RegisterFormFieldsEnum.withdrawOptions]?: Array<ZWithdrawOptionE>
    [RegisterFormFieldsEnum.password]?: string
    [RegisterFormFieldsEnum.passwordConfirmation]?: string
}

export interface ZResetPasswordI {
    [ResetPasswordFormFieldsEnum.phoneNumber]?: string
    [ResetPasswordFormFieldsEnum.otp]?: string
    [ResetPasswordFormFieldsEnum.password]?: string
    [ResetPasswordFormFieldsEnum.passwordConfirmation]?: string
}

// Types
