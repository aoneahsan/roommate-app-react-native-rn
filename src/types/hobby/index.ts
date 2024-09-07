import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";

// enums
export enum EHobbyType {
    music = 'music',
    movie = 'movie',
    travel = 'travel',
    book = 'book',
    gym = 'gym',
    food = 'food'
}

// Interface 
export interface IHobby {
    [FormFieldsEnum.aboutMe]?: string
    [FormFieldsEnum.music]?: Array<string>
    [FormFieldsEnum.movie]?: Array<string>
    [FormFieldsEnum.travel]?: Array<string>
    [FormFieldsEnum.book]?: Array<string>
    [FormFieldsEnum.gym]?: Array<string>
    [FormFieldsEnum.food]?: Array<string>
}