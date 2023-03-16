import React from 'react';
import { HelperText, Button, Text } from 'react-native-paper';
import { IValidationResult, IValidationRule } from '../../utils/validators';
import {launchImageLibrary, ImageLibraryOptions, launchCamera, ImagePickerResponse } from 'react-native-image-picker';
import { Image, PermissionsAndroid, StyleSheet } from 'react-native';

export interface IInputSelectProps {
    value: number | string,
    label: string
}

interface IProps {
    label: string,
    id: string,
    onImageSelected: (fieldName: string, value: string) => void,
    validations?: IValidationRule
}
const ImageSelector = ({label, id, onImageSelected, validations}: IProps) => {
    const [validationCheck, setValidationCheck] = React.useState<IValidationResult>({
        isValid: true,
        message: ''
    })
    const [selectedPhoto, setSelectedPhoto] = React.useState("")

    const invalidPhotoSelection = () => {
        if (validations) {
          setValidationCheck({
            isValid: false,
            message: 'select photo'
          })
        }
    }

    //FIXME: Move to hook or class
    const requestCameraPermission = async () => {
      try {
          const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              {
                  title: 'Camera Permission',
                  message:
                      'Can I have access to your camera please?',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
              },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              return true;
              
          } else {
            invalidPhotoSelection();
            return false;
          }
      } catch (err) {
        invalidPhotoSelection();
        return false;
      }
  }

   const openCamera = async () => {
    const options: ImageLibraryOptions = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
  }
  try {
    const permissionGranted = await requestCameraPermission();
    if (permissionGranted) {
      launchCamera(options, (response) => {
         

        if (response.didCancel) {
             
          invalidPhotoSelection();
      } else if (response.errorMessage) {
      
          invalidPhotoSelection();
      } else {
        if (response.assets && response.assets.length > 0){
          onImageSelected(id, response.assets[0].uri!!)
          setSelectedPhoto(response.assets[0].uri!!)
          setValidationCheck({
              isValid: true
          })
       } else{
          invalidPhotoSelection()
       }
        }
      });
    }
  } catch (error) {
    
  }
      
  
    }


    const selectPhoto = () => {
        const options: ImageLibraryOptions = {
            mediaType: "photo",
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
        }
        launchImageLibrary(options, (response) => {
         
            if (response.didCancel) {
             
                invalidPhotoSelection();
            } else if (response.errorMessage) {
            
                invalidPhotoSelection();
            } else {

           
             if (response.assets && response.assets.length > 0){
                onImageSelected(id, response.assets[0].uri!!)
                setSelectedPhoto(response.assets[0].uri!!)
                setValidationCheck({
                    isValid: true
                })
             } else{
                invalidPhotoSelection()
             }
             
            }
           });
      
    }



    return (<>
    <Text>{label}</Text>
    <Button onPress={selectPhoto}>Chose Photo</Button>
    <Button onPress={openCamera}>Take Photo</Button>
    {selectedPhoto !== "" && (
       <Image
       style={styles.profilepicture}
       source={{
        uri:  selectedPhoto
      }}
       />
        
    )}
    <HelperText type="error" visible={!validationCheck.isValid}>
     {validationCheck.message}
  </HelperText>
    </>
  );
};

const styles = StyleSheet.create({
    profilepicture: {
      width: 200,
      height: 250,
    }
  });
  

export default ImageSelector;