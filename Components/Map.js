import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import MapView, { Marker }from 'react-native-maps';

const Map = ({navigation}) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  return (
    <>
      <MapView
        initialRegion={{
          latitude: 37.78,
          longitude: -122.43,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        onPress={(e) => {
          setSelectedLocation({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
      >
        <Marker coordinate={selectedLocation}/>
      </MapView>
      <Button
        title="Confirm Selected Location"
        onPress={()=>{
          navigation.navigate("Profile", {selectedLocation});
        }}
        disabled={!selectedLocation}
      />
    </>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})