import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, ScrollView, FlatList} from 'react-native';
import Header from "./Components/Header";
import Input from './Components/Input';
import GoalItem from './Components/GoalItem';
import { useState } from 'react';

export default function App() {
  const appName = 'My App';
  const[receivedData, setReceivedData] = useState("");
  const[modalVisible, setModalVisible] = useState(false);
  // {text:..., id:...}
  const[goals, setGoals] = useState([]);

  function handleInputData(data){
    console.log("App.js", data);
    let newGoal = {text: data, id: Math.random()};
    // make a niew obj and store the received data as the obj's text
    setGoals((prevGoals)=>{
      return [...prevGoals, newGoal]
    });
    // setReceivedData(data);
    setModalVisible(false);
  };

  function handleDeleteItem(deletedId) {
    console.log("App.js knows goal is deleted", deletedId);
    setGoals((prevGoals) => {
      return prevGoals.filter((goalObj)=>{
        return goalObj.id !== deletedId;
      });
    });
  }

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
        {/* <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            {goals.map((goalObj)=> {
              return (
              <View key={goalObj.id} style={styles.textContainer}>
                <Text style={styles.text}>{goalObj.text}</Text>
              </View>
            );
            })}
        </ScrollView> */}
        <FlatList contentContainerStyle={styles.scrollViewContainer}
                  data={goals}
                  renderItem={({item}) => {
          return <GoalItem goalObj={item} deleteHandler={handleDeleteItem}/>;
        }}
                  ListEmptyComponent={<Text style={styles.emptyText}>No goals to show</Text>}
                  ListHeaderComponent={<Text style={styles.listHeaderText}>My Goal List</Text>}
        />
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
    fontSize: 30,
    padding: 5,
    borderRadius: 5,
  },
  emptyText:{
    color: 'lightgrey',
    fontSize: 20,
    marginTop: 10,
  },
  listHeaderText:{
    color: 'white',
    fontSize: 30,
    marginTop: 10,
    marginBottom: 10,
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
    width: "100%",
  },
  scrollViewContainer:{
    alignItems: 'center',
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
