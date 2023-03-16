import { EFormElementType, IFormElements } from "./IFormInfo";

export const FormKYC: IFormElements = {
    "consent": {
        label: "Do you consent to be part of the program?",
        type: EFormElementType.selectOne,
        options: [
            {
                label: "Select Choice",
                value: ""
              },
            {
                "label":"Yes",
                "value": "Yes"
            },
            {
                "label":"No",
                "value": "No"
            }

        ],
        validations: {
            "valueIsNotEqualTo": ""
        },
        skipEffect: {
            value: "No",
            disableQuestions: ["reg_date", "rep_name", "photo","location"]
        }
    
    },
    "reg_date": {
        label: "Registration Date",
        type: EFormElementType.date,
        validations: {
            "mustBePastOrToday": true
        }
    },
    "rep_name": {
        "label": "Respondent Name",
        "type": EFormElementType.text,
        validations: {
            "minLen": 1
        }
    },
    "photo": {
        "label": "Respondent Photo",
        "type": EFormElementType.image,
        validations: {
            "isRequired": true
        }
    },
    "location": {
        "label": "Location",
        "type": EFormElementType.gps,
        validations: {
            "isRequired": true
        }
    }
}
