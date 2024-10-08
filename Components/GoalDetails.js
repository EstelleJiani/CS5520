import { StyleSheet, Text, View, Button} from 'react-native'
import React, {useEffect, useState} from 'react'
import PressableButton from './PressableButton';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function GoalDetails({navigation, route}) {
  // Tracking the button press
  const[warning, setWarning] = useState(false);

  // Set the title to the goal's name when screen loads
  useEffect(() => {
      navigation.setOptions({
        title: route.params ? route.params.goalData.text : "Details",
      });
  }, [navigation, route.params]);


  function warningHandler() {
    setWarning((prevWarning)=> !prevWarning);
  }

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
        <Text style={warning ? styles.warningStyle : null}>
          This is the details of a goal with text {route.params.goalData.text }, 
          and its id is:{route.params.goalData.id}
        </Text>
        ) : ( <Text style={warning ? styles.warningStyle : null}>More Details</Text> )
      }
      <View>
        <Button
          title="More Details"
          onPress={()=>{
            navigation.push("Details");
          }}
        />
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
    color: 'darkred',
  },
})