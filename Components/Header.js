// rnf: some templates
import { View, Text, StyleSheet, Dimensions, useWindowDimensions } from 'react-native';
import React from 'react';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


// update the Header component to accept a props
export default function Header(props) {
  const {width, height} = useWindowDimensions();
  console.log(width);
  return (
    <View>
      {/*paddingVertical*/}
      <Text style={[styles.text, {paddingVertical: height < 415 ? 0 :10}]}
      >Welcome to {props.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'royalblue',
    fontSize: windowWidth < 400 ? 20 : 26,
    borderColor: 'royalblue',
    bodrderWidth: 1,
    padding: 10,
    marginBottom: 5,
  },
});