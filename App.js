import { View, Text } from 'react-native'
import React from 'react'
import Home from './Components/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoalDetails from './Components/GoalDetails';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();
console.log(Stack)

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" 
                      component={Home}
                      options={{
                        headerStyle: {backgroundColor: 'aliceblue'},
                        headerTintColor: 'white',
                        title: 'Goals',
                        }}
                      />
        <Stack.Screen name="Details"
                      component={GoalDetails}
                      options={({route})=>{
                          return {
                            title: route.params ? route.params.goalData.text:"More Details",
                            headerRight:()=> {
                              return (
                                <Button 
                                  title="Warning"
                                  onPress={()=> {
                                    console.log("warning");
                                  }}
                                />
                              );
                            },
                          };
                      }}
                      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}