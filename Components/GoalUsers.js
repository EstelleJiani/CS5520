import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

export default function GoalUsers() {
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    // fetch data
    async function fetchData() {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        // promise is not getting rejected if there is an HTTP error (status code not 200)
        // we have to check response.ok
        if (!response.ok){
          // throw an error
          throw new Error(`An HTTP error occurred with status: ${response.status}`);
          // throw new Error('HTTP Error! Status: ' + response.status);
        }
        // this code will only execute if the response.ok is true
        // extract the data
        const data = await response.json();
        // set the users state varible from the fetched data
        console.log(data[0].name);
      } catch (error) {
        console.error("Fetch data error", error);
      }
    }
    fetchData();
    },[]);
  return (
    <View>
      <FlatList>
        
      </FlatList>
    </View>
  )
}

const styles = StyleSheet.create({})