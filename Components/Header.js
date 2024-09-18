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
    color: 'darkmagenta',
    fontSize: 25,
    borderColor: 'darkmagenta',
    bodrderWidth: 2,
    padding: 5,
    marginBottom: 10,
  },
});