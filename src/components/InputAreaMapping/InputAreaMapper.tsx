import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper'
import MapView, {  MapPressEvent, Polygon } from 'react-native-maps';
import { calculateMarkedArea } from '../../utils/calculator';
import { IExtraOptions } from '../../forms/IFormInfo';
import { IValidationRule } from '../../utils/validators';

//this should be in a central location
export interface Coordinate {
  latitude: number;
  longitude: number;
}

interface IProps {
    label: string,
    id: string,
    onAreaCalculated: (fieldName: string, value: number) => void,
    validations?: IValidationRule,
    extraOptions?: IExtraOptions
}

const InputAreaMapper = ({extraOptions, label, id, onAreaCalculated}: IProps) => {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

  const handlePress = (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;
    setCoordinates([...coordinates, coordinate]);
    onAreaCalculated(id, calculateMarkedArea(coordinates, extraOptions))
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
      <Text style={styles.areaValue}>
        Area: {calculateMarkedArea(coordinates, extraOptions).toFixed(2)} {extraOptions && extraOptions.measureIn !== undefined ? extraOptions.measureIn : "Sq Mr"}
      </Text>
      <Button onPress={()=>setCoordinates([])} mode="elevated">
        Clear Area
      </Button>
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
    position: 'absolute',
    bottom: 20,
    left: 20
  },
  areaValue: {
   
    backgroundColor: 'green',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
  
};

export default InputAreaMapper;