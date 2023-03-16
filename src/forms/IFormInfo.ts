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
    gps="gps"
}
export interface IFormElements {
    [fieldName: string]: {
        label: string,
        validations?: IValidationRule,
        effects?: string,
        type: EFormElementType,
        options?: IInputSelectProps[],
        skipEffect?: ISkipFormDataRule
    }
}