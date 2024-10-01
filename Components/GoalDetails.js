import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native';

export default function GoalDetails({navigation, route}) {
  // console.log(route.params.goalData);
  function moreDetailsHandler() {
    navigation.push("Details");
  }
  return (
    <View>
       {route.params ? (
      <Text>This is the details of a goal with text {route.params.goalData.text}  
      and id:{route.params.goalData.id}</Text>
       ):( <Text> More Details</Text>)}
      <Button title="More Details" onPress={moreDetailsHandler}/>
    </View>
  )
}

const styles = StyleSheet.create({})