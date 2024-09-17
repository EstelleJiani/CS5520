import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView} from 'react-native';
import Header from "./Components/Header";
import Input from './Components/Input';
import { useState } from 'react';

export default function App() {
  const appName = 'My App';
  const[receivedData, setReceivedData] = useState("");
  const[modalVisible, setModalVisible] = useState(false);

  function handleInputData(data){
    console.log("App.js", data);
    setReceivedData(data);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto"/>

      <View style={styles.border}>
      <Header name={appName}/>
      </View>

      <View style={styles.button}>
      <Button 
          title="Add a goal"
          onPress={() => setModalVisible(true)}
        />
      </View>

      <View style={styles.topView}>
        <Input 
          autoFocus={true} 
          inputHandler={handleInputData} 
          visibility={modalVisible}/>
      </View>

      <View style={styles.bottomView}>
        <Text style={styles.text}>{receivedData}</Text>
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
    fontSize: 20,
  },
  topView:{
    flex: 1,
    bancgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomView:{
    flex: 4,
    backgroundColor: 'blue',
    alignItems: 'center',
    width: "100%",
  },
  border:{
    borderColor: 'black',
    borderWidth: 2,
  },
  button:{
    width:"30%",
    margin:5,
    backgroundColor:"grey",
  },
});
