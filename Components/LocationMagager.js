import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';


export default function LocationMagager() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [response, requestPermission] = Location.useLocationPermissions();
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

  async function verifyPermission() {
    console.log(response);

    if (response.granted) {
      return true;
    }
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  }

  async function locateUserHandler() {
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

  function chooseLocationHandler() {
    navigation.navigate("Map");
  }

  function saveUserLocationHandler() {
    writeWithIdtoDB({location}, "users", auth.currentUser.uid);
    navigation.navigate("Home");
    };

  return (
    <View>
      <Button 
        title="Locate Me" 
        onPress={locateUserHandler}/>
      {location && (
        <Image 
        source={{
          uri:`https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${process.env.EXPO_PUBLIC_mapsApiKey}`
        }}
        />
      )}
      <Button
        disabled={!location}
        title="Choose Location"
        onPress={saveUserLocationHandler}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  image : {
    width: windowWidth,
    height: 200
  }
})