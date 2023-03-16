import React, { useEffect } from 'react';
import { TextInput, Button, HelperText, Text } from 'react-native-paper';
import { validators,  IValidationResult, IValidationRule } from '../../utils/validators';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';


interface IProps {
    label: string,
    id: string,
    onGPSCordinatesSelected: (fieldName: string, value: GeoPosition) => void,
    validations?: IValidationRule
}

const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === 'granted') {
    
        return true;
      } else {
        
        return false;
      }
    } catch (err) {
      return false;
    }
  };


const InputGPSLocator = ({label, id, onGPSCordinatesSelected, validations}: IProps) => {
    const [position, setPosition] = React.useState<GeoPosition | undefined>(undefined);
    const [validationCheck, setValidationCheck] = React.useState<IValidationResult>({
        isValid: true,
        message: ''
    })

    const getDeviceCurrentLocation = async () => {
        //set options for getting the gps position
        const opt = {
            // timeout:INFINITY,
            // maximumAge:INFINITY,
            // accuracy: { ios: "hundredMeters", android: "balanced" },
            // enableHighAccuracy: false,
            // distanceFilter:0,
            showLocationDialog: true,
            forceRequestLocation: true,
            };
        const getCurrentPosition = () => new Promise<GeoPosition>((resolve, error) => Geolocation.getCurrentPosition(resolve, error, opt));

        try {
            const permissionGranted = await requestLocationPermission();
            if (!permissionGranted) {
                setValidationCheck({
                    isValid: false,
                    message: 'Enable permission to get coordinates'
                })
            } else{
                const gpsPosition: GeoPosition = await getCurrentPosition();
                onGPSCordinatesSelected(id, gpsPosition)
                setPosition(gpsPosition)
            }
        } catch (error) {
            setValidationCheck({
                isValid: false,
                message: 'Error getting coordinates'
            })
        }
      };

      useEffect(()=>{
        if (validations){
            for(let validationMethodName in validations) {
  
              const valdationMethod = validators[validationMethodName]
          
              if (valdationMethod) {

                  const isValid : IValidationResult = valdationMethod(position, validations[validationMethodName])
                  setValidationCheck({
                      isValid: isValid.isValid,
                      message: isValid.message
                  })
                  if (!isValid.isValid){
                      break;
                  }
              }
            }
         }
      }, [position])


    return (<>
      <Button onPress={getDeviceCurrentLocation}>
    {label}
    </Button>

    {position && (
        <Text>{position.coords.latitude} {position.coords.longitude}</Text>
    )}
 
    <HelperText type="error" visible={!validationCheck.isValid}>
      {validationCheck.message}
  </HelperText>
    </>
  );
};

export default InputGPSLocator;