// rnf: some templates
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';


// update the Header component to accept a props
export default function Header(props) {
  return (
    <View>
      <Text style={styles.text}>Welcome to {props.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'royalblue',
    fontSize: 20,
    borderColor: 'royalblue',
    bodrderWidth: 1,
    padding: 10,
    marginBottom: 5,
  },
});