import { View, Text, Button, Modal, TextInput, StyleSheet} from 'react-native'
import React, {useState} from 'react'

export default function Input(props) {
  const [text, setText] = useState("");
  const [showCounter, setShowCounter] = useState(true);
  
  function handleConfirm() {
    // console.log(text);
    // call the callback function received from the App.js component
    // and pass the text that user has typed
    props.inputHandler(text);
    }

    return (
        <Modal animationType='slide' visible={props.visibility}>
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                autoFocus={props.autoFocus}
                placeholder='Type something'
                autoCorrect={true}
                keyboardType='default'
                value={text}
                onChangeText={(changedText) => {
                    setText(changedText)}
                    }
                onBlur={() => {
                    setShowCounter(false)
                }}
                onFocus={() => {
                    setShowCounter(true)
                }}
            />

            <Text>{showCounter ? 
                (text.length > 0 ? text.length : "") :
                (text.length < 3 ?
                    "Please type more than 3 characters" : "Thank you")}</Text>

            <Button
                title="Confirm"
                onPress={handleConfirm}
                style={styles.button}
            />
        </View>
        </Modal>
      )
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {borderColor: 'purple',
            borderWidth: 2,
            padding: 10},
  });