import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from "./Components/Header";

export default function App() {
  // define the app name
  const appName = 'My App';
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName}/>
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
