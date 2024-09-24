import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView} from 'react-native';
import Header from "./Components/Header";
import Input from './Components/Input';
import { useState } from 'react';

export default function App() {
  const appName = 'My App';
  const[receivedData, setReceivedData] = useState("");
  const[modalVisible, setModalVisible] = useState(false);
  // {text:..., id:...}
  const[goals, setGoals] = useState([]);

  function handleInputData(data){
    console.log("App.js", data);
    let newGoal = {text: data, id: Math.random};
    // make a niew obj and store the received data as the obj's text
    setGoals((prevGoals)=>{
      return [...prevGoals, newGoal]
    });
    // setReceivedData(data);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto"/>

      <View style={styles.topView}>
        <View style={styles.border}>
          <Header name={appName}/>
        </View>

        <View style={styles.button}>
          <Button 
            title="Add a goal"
            onPress={() => setModalVisible(true)}
          />
        </View>

        <Input 
          autoFocus={true} 
          inputHandler={handleInputData} 
          visibility={modalVisible} />
      </View>

      <View style={styles.bottomView}>
        {/* use goal.map() and return a view and text for each array items */}
        {goals.map((goalObj)=> {
          return (
          <View key={goalObj.id} style={styles.textContainer}>
            <Text style={styles.text}>{goalObj.text}</Text>
          </View>
        );
      })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: 'white',
    backgroundColor: '#aaa',
    fontSize: 15,
    padding: 5,
    borderRadius: 5,
  },
  topView:{
    flex: 1,
    bancgroundColor: 'aliceblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer:{
    backgroundColor: '#aaa',
    borderRadius: 10,
    padding: 3,
    margin: 10,
  },
  bottomView:{
    flex: 4,
    backgroundColor: 'cornflowerblue',
    alignItems: 'center',
    width: "100%",
  },
  border:{
    borderColor: 'navy',
    borderWidth: 2,
  },
  button:{
    width:"30%",
    margin:10,
    color:"white",
    borderRadius: 8,
    backgroundColor:"whitesmoke",

  },
});
