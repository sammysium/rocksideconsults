import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper'
import MapView, {  MapPressEvent, Polygon } from 'react-native-maps';
import { calculateMarkedArea } from '../../utils/calculator';
import { IExtraOptions } from '../../forms/IFormInfo';
import { IValidationRule } from '../../utils/validators';
import { blue100 } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';

//this should be in a central location
export interface Coordinate {
  latitude: number;
  longitude: number;
}

interface IProps {
    label: string,
    id: string,
    onAreaCalculated: (fieldName: string, value: number, isError: boolean) => void,
    validations?: IValidationRule,
    extraOptions?: IExtraOptions
}

const InputAreaMapper = ({extraOptions, label, id, onAreaCalculated}: IProps) => {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

  const handlePress = (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;
    setCoordinates([...coordinates, coordinate]);
    onAreaCalculated(id, calculateMarkedArea(coordinates, extraOptions), false)
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onPress={handlePress}
      >
        {coordinates.length>0 && 
        <Polygon
          coordinates={coordinates}
          strokeColor="#F00"
          fillColor="rgba(255,0,0,0.5)"
        />
}
      </MapView>
      <View style={styles.areaContainer}>
        <View style={styles.areaValue}>
        <Text style={styles.areaText}>
        Area: {calculateMarkedArea(coordinates, extraOptions).toFixed(2)} {extraOptions && extraOptions.measureIn !== undefined ? extraOptions.measureIn : "Sq Mr"}
      </Text>
      <Button onPress={()=>setCoordinates([])} mode="elevated">
        Clear Area
      </Button>
        </View>
      
      </View>

    </View>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  areaContainer: {
    flexDirection: 'column',
  
  },
  areaValue: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 3,
    borderColor: 'blue',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20
  },
  areaText: {
    backgroundColor: 'green',
    color: 'white',
    fontSize: 15
  }
  
};

export default InputAreaMapper;