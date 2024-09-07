import { agreementStatusEnum, frequencyEnum, privateShareEnum } from "@/types/generic";

export const frequencyEnumVal = [
    frequencyEnum.monthly,
    frequencyEnum.weekly,
    frequencyEnum.yearly,
] as const

export const agreementEnumVal = [
    agreementStatusEnum.yes,
    agreementStatusEnum.no,
    agreementStatusEnum.negotiated,
] as const

export const privateShareEnumVal = [
    privateShareEnum.private,
    privateShareEnum.share,
] as const
