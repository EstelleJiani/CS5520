import { View, Text } from 'react-native'
import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { useState } from 'react';

export default function Input() {
  const [text, setText] = useState("");

  return (
    <TextInput
    placeholder='Type something'
    autoCorrect={true}
    keyboardType='default'
    value={text}
    style={{borderBottomColor: "purple", borderBottomWidth: 2}}
    onChangeText={(changedText) => {
      setText(changedText)}}
    />
  )
}

const styles = StyleSheet.create({})
