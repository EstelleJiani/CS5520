import { View, Text } from 'react-native'
import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { useState } from 'react';

export default function Input(props) {
  const [text, setText] = useState("");
  const [showCounter, setShowCounter] = useState(true);

  return (
    <View>
        <TextInput
            placeholder='Type something'
            autoCorrect={true}
            keyboardType='default'
            value={text}
            style={{borderBottomColor: "purple", borderBottomWidth: 2}}
            onChangeText={(changedText) => {
                setText(changedText)}
                }
            onBlur={() => {
                setShowCounter(false)
            }}
            onFocus={() => {
                setShowCounter(true)
            }}
            autoFocus={props.autoFocus}
        />
        <Text>{showCounter ? 
            (text.length > 0 ? text.length : "") :
            (text.length < 3 ?
                "Please type more than 3 characters" : "Thank you")}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
