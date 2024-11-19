import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './Firebase/firebaseSetup';
import PressableButton from './Components/PressableButton';
import Home from './Components/Home'
import GoalDetails from './Components/GoalDetails';
import Login from './Components/Login';
import Signup from './Components/SignUp';
import Profile from './Components/Profile';
import Map from './Components/Map';

const Stack = createNativeStackNavigator();

const AuthStack = (
  <>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </>
);

const AppStack = (
  <>
    <Stack.Screen 
      name="Home" 
      component={Home}
      options={({navigation}) => {
        return {
          title: 'Goals',
          headerRight: () => {
            return (
              <PressableButton
                pressedHandler={() => {
                  console.log("Navigating to Profile");
                  navigation.navigate("Profile");
                }}
              >
                <Ionicons name="person" size={24} color="royalblue" />
              </PressableButton>
            );
          },
        };
      }}
    />
    <Stack.Screen 
      name="Details"
      component={GoalDetails}
      options={({navigation, route}) => {
        return {
          title: route.params ? route.params.goalData.text : "More Details",
          };
      }}
      // options={({route})=>{
      //   return {
      //     title: route.params ? route.params.goalData.text:"More Details",
      //     headerRight:()=> {
      //       return (
      //         <Button 
      //           title="Warning"
      //           onPress={()=> {
      //           console.log("warning");
      //           }}
      //         />
      //       );
      //     },
      //   };
      // }}
    />

    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerRight: () => {
          return (
            <PressableButton
              pressedHandler={() => {
                try {
                  signOut(auth);
                } catch (err) {
                  console.log("sign out ", err);
                }
              }}
            >
              <AntDesign name="logout" size={24} color="royalblue" />
            </PressableButton>
          );
        },
      }}
    />
    <Stack.Screen name="Map" component={Map} />
  </>
);
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={
        {headerStyle: {backgroundColor: 'whitesmoke',},
          headerTintColor: 'royalblue',
        }}
      >

        {isAuthenticated ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}