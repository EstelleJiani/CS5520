import { StyleSheet, Text, View, Button} from 'react-native'
import React, {useEffect, useState} from 'react'

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
    setWarning((prevWarning)=> {
      const newWarning = !prevWarning;

      navigation.setOptions({
        title: newWarning ? "Warning": route.params.goalData.text,
      });
      return newWarning;
    });
  }


  // Set the header right button warning when screen loads
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Warning" color="royalblue" onPress={warningHandler}/>
      ),
    });
  }, [navigation, warning]);

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
})