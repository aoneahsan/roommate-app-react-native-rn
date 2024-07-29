import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";

// Enums
export enum ETransferMethod {
    paymentVerificationRequest = 'paymentVerificationRequest',
    waitingForReview = 'waitingForReview',
    completed = 'completed',
    rejected = 'rejected',
}

export enum ETopUpStatus {
    easyPaisa = 'easyPaisa',
    jazzCash = 'jazzCash',
}

export enum ZTopUpTableColumnsIds {
    id = '__z_top_up_id__',
    amount = '__z_top_up_amount__',
    agentRemarks = '__z_top_up_agent_remarks__',
    transferMethod = '__z_top_up_transfer_method__',
    receptScreenshot = '__z_top_up_recept_screenshot__',
    status = '__z_top_up_status__',
    actions = '__z_top_up_actions__',
}

// Interface 
export interface ITopUps {
    [FormFieldsEnum.id]: string;

    [FormFieldsEnum.amount]: string;
    [FormFieldsEnum.agentRemarks]: string;
    [FormFieldsEnum.transferMethod]: ETransferMethod;
    [FormFieldsEnum.receptScreenshot]: string;
    [FormFieldsEnum.status]?: ETopUpStatus;

    [FormFieldsEnum.isActive]?: boolean;
    [FormFieldsEnum.sortOrderNo]?: string;
    [FormFieldsEnum.createdAt]?: string;
    [FormFieldsEnum.updatedAt]?: string;
    [FormFieldsEnum.deletedAt]?: string;
}
