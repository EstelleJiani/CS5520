import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from "./Components/Header";
import { useState } from 'react';

export default function App() {
  const [text, setText] = useState();
  // define the app name
  const appName = 'My App';

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName}/>
      <TextInput
        placeholder='Type something'
        autoCorrect={true}
        keyboardType='default'
        value={text}
        style={{boarderBottomColor: "purple", boarderBottomWidth: 2}}
        onChangeText={(changedText) => {
          setText(changedText)}}
        />
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
