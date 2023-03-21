export interface IValidationResult {
    isValid: boolean,
    message?: string
}

//used in the JSON and input elements to state which validation methods are to be used and the expecetd value
// e.g. "minLen": 3
// could be expanded to handle custom data types.
export interface IValidationRule {
    [validatinMethodName: string] : number|string|boolean|Date
}

function minLen(value: string, expectedLen: number): IValidationResult {
     if (value.length < expectedLen ) {
        return {
            isValid: false,
            message: `Min length must be ${expectedLen}`
        }
     }
    return {isValid: true}
}

function maxLen(value: string, expectedLen: number): IValidationResult {

    if (value.length > expectedLen ) {
        return {
            isValid: false,
            message: `Max length must be ${expectedLen}`
        }
     }
    return {isValid: true}
}

function isRequired(value?: string, _? : any): IValidationResult {
    
    if (value && value.length < 0 ) {
        return {
            isValid: false,
            message: `This is required`
        }
     }
    return {isValid: true}
}

function valueIsNotEqualTo(value: string | number, badValue: string | number): IValidationResult {
     if (value.toLocaleString() === badValue.toLocaleString()) {
        return {
            isValid: false,
            message: `This cannot be ${value}`
        }
     }
     return {isValid: true}
 }

 function mustBeFutureDate(value: Date, _: any): IValidationResult {
    if (value.setHours(0,0,0,0) < new Date().setHours(0,0,0,0)) {
        return {
            isValid: false,
            message: 'This must be a future date'
        }
    }

    return {isValid: true}
 }

 function mustBePastOrToday(value: Date, _: any): IValidationResult {
    if (value.setHours(0,0,0,0) > new Date().setHours(0,0,0,0)) {
        return {
            isValid: false,
            message: 'This must be a past date'
        }
    }

    return {isValid: true}
 }

 function gpsLocationAccuracyMustBeWithin(value: number, accuracyNeeded: number): IValidationResult {
   
    if (value > accuracyNeeded) {
        return {
            isValid: false,
            message: `The location must be accurate to ${accuracyNeeded}m. Current accuracy is ${value}`
        }
    }
    return {isValid: true}
 }




export const validators: {[methodName:  string] : Function } = {
    minLen,
    maxLen,
    isRequired,
    valueIsNotEqualTo,
    mustBeFutureDate,
    mustBePastOrToday,
    gpsLocationAccuracyMustBeWithin
}