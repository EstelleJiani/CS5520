import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, ScrollView, FlatList, Alert} from 'react-native';
import Header from "./Header";
import Input from './Input';
import GoalItem from './GoalItem';
import { useState, useEffect } from 'react';
import PressableButton from './PressableButton';
import { database } from '../Firebase/firebaseSetup';
import { writeToDB, deleteFromDB } from '../Firebase/firestoreHelper';
import { doc, onSnapshot } from 'firebase/firestore';
import { collection } from 'firebase/firestore';


export default function Home({navigation}) {
  // console.log(database);
  // writeToDB({name: "Neda"}, "goals");

  const appName = 'My App';
  const[receivedData, setReceivedData] = useState("");
  const[modalVisible, setModalVisible] = useState(false);
  // {text:..., id:...}
  const[goals, setGoals] = useState([]); 

  useEffect(() => {
    onSnapshot(collection(database, "goals"), (querySnapshot) => {
      let goals = [];
      querySnapshot.forEach((docSnapshot) => {
        console.log(docSnapshot.id);
        goals.push({ ...docSnapshot.data(), id: docSnapshot.id });
        console.log(goals);
      });
      setGoals(goals);
    });
  }, []);


  function handleInputData(data){
    console.log("App.js", data);
    // let newGoal = {text: data, id: Math.random()};
    let newGoal = {text: data};
    writeToDB( "goals",newGoal);

    // make a niew obj and store the received data as the obj's text
    // setGoals((prevGoals)=>{
    //   return [...prevGoals, newGoal]
    // });
    // setReceivedData(data);
    setModalVisible(false);
  };

  function handleDeleteItem(deletedId) {
    // console.log("Home.js knows goal is deleted", deletedId);
    // setGoals((prevGoals) => {
    //   return prevGoals.filter((goalObj)=>{
    //     return goalObj.id !== deletedId;
    //   });
    // });
    deleteFromDB("goals", deletedId);
  }

  function handlePressGoal(pressId) {
    //Navigate to GoalDetails
    console.log("Home.js know goal detail is pressed", pressId);
    navigation.navigate("Details", {goalData: pressId});
  }

  function handleDeleteAll() {
    Alert.alert("Delete All", "Are you sure you want to delete all goals?", [
                  {text: "No", style: "cancel"},
                  {text: "Yes", onPress:() => setGoals([]) }
                ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto"/>

      <View style={styles.topView}>
        <View style={styles.border}>
          <Header name={appName}/>
        </View>

        <View style={styles.button}>
          <PressableButton
            pressedHandler={function() {
              setModalVisible(true);
            }}
            componentStyle={{backgroundColor:"grey"}}>
            <Text>Add a goal</Text>
          </PressableButton>
          {/* <Button 
            title="Add a goal"
            onPress={() => setModalVisible(true)}
          /> */}
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
        <FlatList
          contentContainerStyle={styles.scrollViewContainer}
          data={goals}
          renderItem={({item}) => {
            return <GoalItem goalObj={item} 
                    deleteHandler={handleDeleteItem}
                    pressHandler={handlePressGoal}/>;
          }}
          ListEmptyComponent={
            <Text style={styles.listEmptyText}>No goals to show</Text>}
          ListHeaderComponent={
            goals.length > 0 ?
            <Text style={styles.listHeaderText}>My Goal List</Text> :
            null}
          ListFooterComponent={
            goals.length > 0 ?
            <View style={styles.button}>
              <Button 
                title="Delete All"
                onPress={handleDeleteAll}
              /> 
            </View>
            : null }
          ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
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
    fontSize: 20,
    padding: 5,
    borderRadius: 5,
  },
  listEmptyText:{
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  },
  listHeaderText:{
    color: 'white',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  listSeparator:{
    height: 3,
    backgroundColor: 'lightgrey',
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
    borderRadius: 8,
    backgroundColor:"whitesmoke",
  },
});
