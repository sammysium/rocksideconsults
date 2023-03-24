import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { validators,  IValidationResult, IValidationRule } from '../../utils/validators';


interface IProps {
    label: string,
    id: string,
    onChangeText: (elementName: string, value: string, errorFound: boolean) => void,
    validations?: IValidationRule
}
const InputText = ({label, id, onChangeText, validations}: IProps) => {
    const [text, setText] = React.useState("");
    const [validationCheck, setValidationCheck] = React.useState<IValidationResult>({
        isValid: true,
        message: ''
    })

    const handleTextChange = (value: string) => {
       setText(value)
       if (validations){
          for(let validationMethodName in validations) {
            
            const valdationMethod = validators[validationMethodName]
        
            if (valdationMethod) {
                //we got a validate method run it now    
             
                const isValid : IValidationResult = valdationMethod(value, validations[validationMethodName])
               
                setValidationCheck({
                    isValid: isValid.isValid,
                    message: isValid.message
                })
                if (isValid.isValid){
                    onChangeText(id, text, false)
                } else{
                    onChangeText(id, text, true)
                    break;
                }
            }
          }
       }else{
        onChangeText(id,text, false)
       }
    }

    return (<>
    <TextInput
    label={label}
    value={text}
    onChangeText={text => handleTextChange(text)}/>
    <HelperText type="error" visible={!validationCheck.isValid}>
     {validationCheck.message}
  </HelperText>
    </>
  );
};

export default InputText;