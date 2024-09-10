// rnf: some templates
import { View, Text } from 'react-native';
import React from 'react';


// update the Header component to accept a props
export default function Header(props) {
  return (
    <View>
      {/*Use the props here */}
      <Text>Welcome to {props.name}</Text>
    </View>
  )
}
