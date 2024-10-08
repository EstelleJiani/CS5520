import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function PressableButton({
  children,
  componentStyle,
  pressedHandler,
  pressedStyle}) {
    return (
      <Pressable
        onPress={pressedHandler}
        style={({pressed})=>[
            styles.defaultStyle,
            componentStyle,
            // pressed && defaultPressedStyle,
            pressed && pressedStyle
          ]}>
        <View>
          <Text>{children}</Text>
        </View>
      </Pressable>
  )
}

const styles = StyleSheet.create({
  defaultStyle:{
    backgroundColor: 'beige',
  },
  defaultPressedStyle:{
    backgroundColor: 'pink',
  },
})