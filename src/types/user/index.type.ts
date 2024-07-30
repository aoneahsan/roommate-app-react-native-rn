import { FormFieldsEnum } from '@/utils/enums/formFieldsEnum';
import { IUser as IUserZRTK } from 'zaions-react-tool-kit';
import { ZRUSelectValueI } from 'zaions-react-ui-kit';

// Enums
export enum ZWithdrawOptionE {
    jazzCash = 'jazzCash',
    easyPaisa = 'easyPaisa'
}

export enum ZUserColumnsEnum {
    id = 'id',
    name = 'name',
    email = 'email',
    phoneNumber = 'phoneNumber',
    city = 'city',
    country = 'country',
    referralCode = 'referralCode',
    withdrawOption = 'withdrawOption',
}

export enum ZUserTableColumnsIds {
    id = '__z_user_id__',
    name = '__z_user_name__',
    email = '__z_user_email__',
    phoneNumber = '__z_user_phone_number__',
    city = '__z_user_city__',
    country = '__z_user_country__',
    referralCode = '__z_user_referral_code__',
    withdrawOptions = '__z_user_withdraw_options__',
    isBlocked = '__z_user_is_blocked__',
    actions = '__z_user_actions__'
}

// Interfaces
export interface IUser extends Partial<IUserZRTK> {
    [FormFieldsEnum.country]?: string
    [FormFieldsEnum.city]?: string
    [FormFieldsEnum.referralCode]?: string
    [FormFieldsEnum.withdrawOptions]?: Array<ZWithdrawOptionE>
    [FormFieldsEnum.phoneNumber]?: string
    [FormFieldsEnum.isBlocked]?: boolean
    [FormFieldsEnum.blockedAt]?: string
    [FormFieldsEnum.age]?: Partial<ZRUSelectValueI> | null
    [FormFieldsEnum.gender]?: Partial<ZRUSelectValueI> | null
    [FormFieldsEnum.constellations]?: Partial<ZRUSelectValueI> | null
    [FormFieldsEnum.hometown]?: Partial<ZRUSelectValueI> | null
    [FormFieldsEnum.language]?: Partial<ZRUSelectValueI> | null
    // For frontend 
    [FormFieldsEnum.actions]?: string
}
