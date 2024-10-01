import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const GoalItem = ({goalObj, deleteHandler, pressHandler}) => {
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
      <Text style={styles.text}>{goalObj.text}</Text>
      <Button title="X" color='grey' onPress={handleDeleteItem}/>
      <Button title="i" color='grey' onPress={handlePress}/>
    </View>
  )
};

const styles = StyleSheet.create({
  text:{
    color: 'white',
    backgroundColor: '#aaa',
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
})

export default GoalItem


