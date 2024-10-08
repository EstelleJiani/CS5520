import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import PressableButton from './PressableButton';
import AntDesign from '@expo/vector-icons/AntDesign';

const GoalItem = ({goalObj, deleteHandler, /*pressHandler*/}) => {
  const navigation = useNavigation();

  function handleDeleteItem() {
    console.log("deleted");
    deleteHandler(goalObj.id);
  }

  function handlePress() {
    navigation.navigate("Details", {goalData: goalObj});
  }

  return (
    <View key={goalObj.id} style={styles.textContainer}>
      <Pressable
        onPress={handlePress}
        // style={styles.horizontalContainer}
        style={({pressed})=>{
          // styles.textContainer,
          // pressed ? styles.pressedStyle : null,
          return [styles.horizontalContainer, pressed && styles.pressedStyle]
        }}
        android_ripple={{ color: 'lightgrey', radius: 25 }}>
        <Text style={styles.text}>{goalObj.text}</Text>
        {/* <Button title="X" color='grey' onPress={handleDeleteItem}/> */}
        <PressableButton 
          componentStyle={styles.deleteButton}
          pressedHandler={handleDeleteItem}
          pressedStyle={styles.pressedStyle}>
          <AntDesign name="delete" size={24} color="darkgrey"/>
          {/* <Text style={styles.deleteButton}>X</Text> */}
          
        </PressableButton>
        {/* <Button title="i" color='grey' onPress={handlePress}/> */}
      </Pressable>
    </View>
  )
};

const styles = StyleSheet.create({
  text:{
    color: 'white',
    fontSize: 30,
    padding: 5,
    borderRadius: 5,
  },
  textContainer:{
    backgroundColor: '#aaa',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalContainer:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressedStyle:{
    opacity: 0.5,
    backgroundColor: 'lightsteelblue',
  },
  deleteButton:{
    backgroundColor: 'grey',
  },
  deleteText:{
    color: 'white',
    fontSize: 20,
  },
})

export default GoalItem


