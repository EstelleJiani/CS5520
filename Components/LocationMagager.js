import React, { useEffect, useState } from 'react'
import {
  Alert,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'
import * as Location from 'expo-location';
import { useNavigation, useRoute } from '@react-navigation/native';
import { auth } from '../Firebase/firebaseSetup';
import { getADoc, writeWithIdtoDB } from '../Firebase/firestoreHelper';

const windowWidth = Dimensions.get("window").width;

export default function LocationMagager() {
  const navigation = useNavigation();
  const route = useRoute();

  const [response, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (route.params) {
      setLocation(route.params.selectedLocation);
    }
  },[route]);

  useEffect(()=> {
    async function getUserData() {
      const userData = await getADoc("users", auth.currentUser.uid);
      if (userData) {
        setLocation(userData.location);
      }
    }
    getUserData();
  }, []);

  const verifyPermission = async () => {
    console.log(response);

    if (response.granted) {
      return true;
    }
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  }

  const locateUserHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to grant location permissions to use the location service.");
        return;
      }
      const result = await Location.getCurrentPositionAsync();
      
      setLocation({
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
      })
    } catch (err) {
      console.log("Locate User", err);
    }
  }

  const chooseLocationHandler = () => {
    navigation.navigate("Map");
  }

  const saveUserLocationHandler = () => {
    writeWithIdtoDB("users", auth.currentUser.uid, { location });
    navigation.navigate("Home");
  }

  return (
    <View>
      <Button 
        title="Locate Me" 
        onPress={locateUserHandler}/>
      <Button
        title="Choose Location"
        onPress={chooseLocationHandler}/>
      {location && (
        <Image 
          source={{
            uri:`https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${process.env.EXPO_PUBLIC_mapsApiKey}`
          }}
          style={styles.image}
        />
      )}
      <Button
        disabled={!location}
        title="Save Location"
        onPress={saveUserLocationHandler}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: windowWidth,
    height: 200,
  }
})