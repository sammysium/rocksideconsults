import React from 'react';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { validators,  IValidationResult, IValidationRule } from '../../utils/validators';
import DatePicker from 'react-native-date-picker'

export enum EDateTimePickerType {
    date="date",
    time="time",
    datetime="datetime"
}
interface IProps {
    label: string,
    id: string,
    onDateSelected: (fieldName: string, value: Date) => void,
    validations?: IValidationRule,
    mode: EDateTimePickerType
}
const InputDate = ({label, id, onDateSelected, validations, mode}: IProps) => {
    const [displayDateSelector, setDisplayDateSelector] = React.useState(false)
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [validationCheck, setValidationCheck] = React.useState<IValidationResult>({
        isValid: true,
        message: ''
    })

    const handleSelectedDateChange = (value: Date) => {
      
        setSelectedDate(value)
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
                    onDateSelected(id, value)
                } else{
                    break;
                }
            }
          }
       }else{
        onDateSelected(id, value)
       }
    }

    return (<>
      <Button onPress={() => setDisplayDateSelector(!displayDateSelector)}>
    {label} {selectedDate.toDateString()}
  </Button>
    <DatePicker
        mode={mode}
        modal
        open={displayDateSelector}
        date={selectedDate}
        onConfirm={(date) => {
          setDisplayDateSelector(false)
          handleSelectedDateChange(date)
        }}
        onCancel={() => {
          setDisplayDateSelector(false)
        }}
      />
    <HelperText type="error" visible={!validationCheck.isValid}>
     {validationCheck.message}
  </HelperText>
    </>
  );
};

export default InputDate;