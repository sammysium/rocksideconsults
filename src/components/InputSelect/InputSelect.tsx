import React from 'react';
import { HelperText } from 'react-native-paper';
import { validators,  IValidationResult, IValidationRule } from '../../utils/validators';
import DropDown from "react-native-paper-dropdown";
import { ISkipFormDataRule } from '../../forms/IFormInfo';

export interface IInputSelectProps {
    value: number | string,
    label: string
}

interface IProps {
    label: string,
    id: string,
    options: IInputSelectProps[],
    onSelectionChanged: (element: string, value: string) => void,
    validations?: IValidationRule,
    skipEffect?: ISkipFormDataRule,
    skipEffectHandler: (disableFields: string[]) => void
}
const InputSelect = ({label, id, onSelectionChanged, validations, options, skipEffect, skipEffectHandler}: IProps) => {
    const [showDropDown, setShowDropDown] = React.useState(false);
    const [selection, setSelection] = React.useState < string >("");
    const [validationCheck, setValidationCheck] = React.useState<IValidationResult>({
        isValid: true,
        message: ''
    })
    const emitEffects = (currentValue: string) => {
        if (skipEffect && skipEffect.value === currentValue) {
            skipEffectHandler(skipEffect.disableQuestions)
        } else{
            skipEffectHandler([])
        }
    }
    const handleTextChange = (value: string) => {
        setSelection(value)
       if (validations){
          for(let validationMethodName in validations) {
          
            const valdationMethod = validators[validationMethodName]
        
            if (valdationMethod) {
   
                const isValid : IValidationResult = valdationMethod(value, validations[validationMethodName])
       
                setValidationCheck({
                    isValid: isValid.isValid,
                    message: isValid.message
                })
                if (isValid.isValid){
                    emitEffects(value)
                    onSelectionChanged(id, value)
                    
                } else{
                    break;
                }
            }
          }
       }else{
        emitEffects(value)
        onSelectionChanged(id, value)
       }
    }

    return (<>
    <DropDown
              label={label}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={selection}
              setValue={handleTextChange}
              list={options}
            />
    <HelperText type="error" visible={!validationCheck.isValid}>
     {validationCheck.message}
  </HelperText>
    </>
  );
};

export default InputSelect;