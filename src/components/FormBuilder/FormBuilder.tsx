import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { GeoPosition } from "react-native-geolocation-service";
import { Button, Text } from "react-native-paper";
import { EFormElementType, IFormElements } from "../../forms/IFormInfo";
import { IValidationRule } from "../../utils/validators";
import ImageSelector from "../ImageSelector/ImageSelector";
import AsyncStorage from '@react-native-async-storage/async-storage';

import InputDate, { EDateTimePickerType } from "../InputDate/InputDate";
import InputGPSLocator from "../InputGPSLocator/InputGPSLocator";
import InputSelect, { IInputSelectProps } from "../InputSelect/InputSelect";
import InputText from "../InputText/InputText";
import InputAreaMapper from "../InputAreaMapping/InputAreaMapper";

interface IProps {
    formDetail: IFormElements
}



const FormBuilder = ({formDetail}: IProps) => {   
    const [data, setData] = React.useState({})
    const [errorFields, setErrorFields]= React.useState<string[]>([])
    const [disabledElements, setDisabledElements] = React.useState<string[]>([])

    const _manageErrors = (fieldName: string, isErrorfulField: boolean) => {
       if (isErrorfulField){
        setErrorFields(oldArray => [...oldArray, fieldName]);
       } else {
        setErrorFields(errorFields.filter((fn)=>fn !== fieldName))
       }
    }


    const handleGPS = (fieldName: string, isError: boolean, value?: GeoPosition) => {
        if(isError){
            _manageErrors(fieldName, isError)
        } else {
        setData({
            ...data,
            [fieldName]: value
          });
        }
    }

    const handleTexts = (fieldName: string, value: string, isError: boolean)=>{
        if(isError){
            _manageErrors(fieldName, isError)
        } else {
            _manageErrors(fieldName, isError)
        setData({
            ...data,
            [fieldName]: value
          });
        }
    }

    const handleDate = (fieldName: string, value: Date, isError : boolean = false)=>{
        if(isError){
            _manageErrors(fieldName, isError)
        } else {
            _manageErrors(fieldName, isError)
            setData({
                ...data,
                [fieldName]: value
              });
        }
       
    }

    const handleImage = (fieldName: string, value: string, isError: boolean) => {
        if(isError){
            _manageErrors(fieldName, isError)
        } else {
            _manageErrors(fieldName, isError)
        setData({
            ...data,
            [fieldName]: value
          });
        }
    }

    const handleCalculatedArea = (fieldName: string, value: number) => {
        setData({
            ...data,
            [fieldName]: value
        })
    }

    const handleDisableElementsFromEffect = (disableFields: string[]) => {
     
      setDisabledElements(disableFields)
    }

    const saveDataToJson = async () => {
        try {
            await AsyncStorage.setItem('customerName', JSON.stringify(data))
            Alert.alert("Done", "Saved Data")
          } catch (e) {
            // saving error
            Alert.alert("Error", "Error saving data")
          }
    }

    const disableTouch = (fieldName: string) => {
        if (disabledElements.indexOf(fieldName) > -1) {
            return 'none'
        }
        return 'auto'
    }
    
    

    const renderForm = () => {
        const elements: React.ReactNode[] = []

        for(let fieldName in formDetail) {
            const {label, type, effects, options, validations, skipEffect, extra }  = formDetail[fieldName]
            switch (type) {
                case EFormElementType.text:
                    elements.push(<View key={fieldName} pointerEvents={disableTouch(fieldName)} style={styles.inputView}><InputText label={label} id={fieldName} onChangeText={handleTexts} validations={validations} /></View>)
                break;
                case EFormElementType.selectOne:

                    elements.push(<View key={fieldName}  style={styles.inputView} pointerEvents={disableTouch(fieldName)}><InputSelect label={label} id={fieldName} options={options!!} onSelectionChanged={handleTexts} validations={validations} skipEffect={skipEffect} skipEffectHandler={handleDisableElementsFromEffect}/></View>)
                break;

                case EFormElementType.date:

                     elements.push(<View key={fieldName}  style={styles.inputView} pointerEvents={disableTouch(fieldName)}><InputDate label={label} id={fieldName} onDateSelected={handleDate} mode={EDateTimePickerType.date} validations={validations} /></View>)
                 break;
                
                 case EFormElementType.image:
                    elements.push(<View key={fieldName} style={styles.inputViewPhoto}  pointerEvents={disableTouch(fieldName)}><ImageSelector label={label} id={fieldName} onImageSelected={handleImage} /></View>)
                break;

                case EFormElementType.gps:
                    elements.push(<View key={fieldName} style={styles.inputView} pointerEvents={disableTouch(fieldName)}><InputGPSLocator label={label} id={fieldName} onGPSCordinatesSelected={handleGPS} validations={validations} /></View>)
                    break;
                case EFormElementType.land:
                    elements.push(<View key={fieldName} style={styles.inputViewMap} pointerEvents={disableTouch(fieldName)}><InputAreaMapper label={label} id={fieldName} onAreaCalculated={handleCalculatedArea} validations={validations} extraOptions={extra} /></View>)
                    break;
            }
        }
        return elements

    }   


    return (
    <View style={styles.container}>
    {renderForm()}
    <Button onPress={saveDataToJson} mode="contained" disabled={errorFields.length>0}>Save</Button>
    
    </View>)
};

const styles = StyleSheet.create({

    container: {
  
      flex: 1,
  
      backgroundColor: '#fff',
      flexDirection: 'column'
  
     },
  
     inputView: {
    
        marginBottom: 5,
    
       
      

        marginVertical: 5,
        textAlign: 'left'
    
      },
      inputViewMap: {
    
        marginBottom: 5,
    
       
        height: 350,

        marginVertical: 5,
        textAlign: 'left'
    
      },
      inputViewPhoto: {
        
    
       
        flex: 1,
        flexDirection: 'column',

        marginVertical: 5,
        textAlign: 'center'
        
      }
      
    
  
      
  
  });
  

export default FormBuilder;