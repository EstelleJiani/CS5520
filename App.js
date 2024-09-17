import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from "./Components/Header";
import Input from './Components/Input';
import { useState } from 'react';

export default function App() {
  // define the app name
  const appName = 'My App';

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName}/>
      <Input autoFocus={true}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
