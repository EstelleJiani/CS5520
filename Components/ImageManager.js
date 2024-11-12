import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native'
import React, {useState } from 'react'
// import {launchCamearaAsync} from 'expo-image-picker';
import * as ImagePicker from 'expo-image-picker';

export default function ImageManager({imageUriHandler}) {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState("");

  async function verifyPermission() {
    console.log(response);
    // check if user has given permission to use the camera
    // if so return true
    try{
      if (response.granted) {
        return true;
      }
      // if not ask for permission
      const permissionResponse = await requestPermission();
      console.log(permissionResponse);
      return permissionResponse.granted;
    } catch (err) {
      console.log("veriy permission", err);
    }
  }

  async function takeImageHandler () {
    try {
      const hasPermission = await verifyPermission();
      console.log(hasPermission);
      if (!hasPermission) {
        Alert.alert("You need to grant camera permissions to use the camera.");
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });

      setImageUri(result.assets[0].uri);
      imageUriHandler(result.assets[0].uri);
      console.log(result);
    } catch (err) {
      console.log("take image", err);
    }
  }

  return (
    <View>
      <Button title="TAKE AN IMAGE" onPress={takeImageHandler} />
      {imageUri && (
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.image}
          alt="preview of the image taken"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image : {
    width: 200,
    height: 200
  }
});