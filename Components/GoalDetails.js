import { StyleSheet, Text, View, Button, Image} from 'react-native'
import React, {useEffect, useState} from 'react'
import PressableButton from './PressableButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import { updateFieldInDB } from '../Firebase/firestoreHelper';
import GoalUsers from './GoalUsers';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../Firebase/firebaseSetup";

export default function GoalDetails({navigation, route}) {
  // Tracking the button press
  const[warning, setWarning] = useState(false);
  const[imageUri, setImageUri] = useState("");

  function warningHandler() {
    setWarning((prevWarning)=> !prevWarning);
    
    // Update the warning field in the database
    if (!warning) {
      // if the warning is false, set i
      updateFieldInDB("goals", route.params.goalData.id, {warning: true});
    } else {
      updateFieldInDB("goals", route.params.goalData.id, {warning: false});}
    }

  useEffect(() => {
    async function getImageUrl(){
      if (route.params) {
        try{
          const uri = await getDownloadURL(
            ref(storage, route.params.goalData.imageUri)
          );
          console.log("URL:", uri);
          setImageUri(uri);
        } catch (err) {
          console.log("Get image uri", err);
        }
      }
    }
    getImageUrl();
  }, []);

  // Set the title to the goal's name when screen loads
  useEffect(() => {
      navigation.setOptions({
        title: route.params ? route.params.goalData.text : "Details",
      });
  }, [navigation, route.params]);


  useEffect(() => {
    navigation.setOptions({
      title: warning ? "Warning": route.params.goalData.text,
      headerRight: () => (
        <PressableButton
          pressedHandler={warningHandler}
          componentStyle={styles.warningStyle}
          pressedStyle={styles.pressedWarningButtonStyle}>
          <AntDesign name="warning" size={24} color="royalblue" />
        </PressableButton>
      ),
    });
  }, [navigation, warning, route.params]);

  return (
    <View style={styles.container}>
      {route.params ? (
        <View>
          <Text style={warning ? styles.warningStyle : null}>
            This is the details of a goal with text:
            {route.params.goalData.text }, and its id is:{route.params.goalData.id}
        </Text>
        {imageUri && (
          <Image
            source={{
              uri: imageUri
            }}
            style={styles.image}
          />
        )}
        </View>
      ) : ( 
        <Text style={warning ? styles.warningStyle : null}>
          More Details
        </Text> 
      )}
      
      <View>
        <Button
          title="More Details"
          onPress={()=>{
            navigation.push("Details");
          }}
        />
        <GoalUsers id={route.params.goalData.id}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningStyle:{
    color: 'red',
  },
  pressedWarningButtonStyle:{
    backgroundColor: 'orange',
  },
  image:{
    width: 200,
    height: 200,
  },
})