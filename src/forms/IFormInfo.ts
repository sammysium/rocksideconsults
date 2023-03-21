import { IInputSelectProps } from "../components/InputSelect/InputSelect"
import { IValidationRule } from "../utils/validators"

export interface ISkipFormDataRule {
    value: string,
    disableQuestions: string[]
}
export enum EFormElementType {
    text="text",
    date="date",
    selectOne="selectOne",
    image="image",
    gps="gps",
    land="land"
}
export enum EExtraOptions {
    "acre"="acre"
}
export interface IExtraOptions {
    measureIn?: EExtraOptions
}
export interface IFormElements {
    [fieldName: string]: {
        label: string,
        validations?: IValidationRule,
        effects?: string,
        type: EFormElementType,
        options?: IInputSelectProps[],
        skipEffect?: ISkipFormDataRule,
        extra?: IExtraOptions
    }
}