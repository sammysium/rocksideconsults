import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';

export type TMenuCard = {
  enabled?: boolean;
  title?: string;
  onTap?: () => void;
};
const AreaMappingGestureHandler: FC<TMenuCard> = ({ title, onTap, enabled }) => {
  const [points, setPoints] = React.useState([])
  return (
    <MapView
  
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    //onRegionChangeComplete runs when the user stops dragging MapView
    onRegionChangeComplete={(region) => console.log(region)}
  />
  );
};

export default AreaMappingGestureHandler;

const styles = StyleSheet.create({
  title: {
    color: '#241f1f',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  button: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  img: {
    height: 24,
    width: 24,
    tintColor: 'white',
  },
});