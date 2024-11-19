import { View, Text, Button, Modal, TextInput, StyleSheet, Alert, Image} from 'react-native'
import React, {useState} from 'react'
import ImageManager from './ImageManager'

export default function Input(props) {
  const [text, setText] = useState("");
  const [showCounter, setShowCounter] = useState(true);
  const [imageUri, setImageUri] = useState("");


  function handleConfirm() {
    // console.log(text);
    // call the callback function received from the App.js component
    // and pass the text that user has typed
    props.inputHandler({text, imageUri: imageUri});
    setText("");
  }

  function handleCancel() {
    Alert.alert("Are you sure you want to cancel?", "", [
        {text: "Cancel", style: "cancel"},
        {text: "OK", onPress: clearInput}
    ]);
  }

  function clearInput() {
    console.log("Clearing input");
    setText("");
    setShowCounter(false);
    props.inputHandler("");
  }

  function imageUriHandler(uri) {
    console.log("Image uri handler", uri);
    setImageUri(uri);
  }

  return (
    <Modal animationType='slide' transparent={true} visible={props.visibility}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Image
            source={{uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png'}}
            alt='target (network)'
            style={{width: 100, height: 100, marginTop: 10}}
          />
          <Image
            source={require('../assets/target.png')}
            alt='target (local)'
            style={{width: 100, height: 100, marginBottom: 10}}
          />
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

          <ImageManager imageUriHandler={imageUriHandler}/>

          <Text>{showCounter ? 
            (text.length > 0 ? text.length : "") :
            (text.length < 3 ?
              "Please type more than 3 characters" : "Thank you")}</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <Button
                title="Cancel"
                onPress={handleCancel}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Confirm"
                onPress={handleConfirm}
                disabled={text.length < 3}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },

    modalContainer: {
      backgroundColor: 'aliceblue',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },

    input: {
      borderColor: 'cornflowerblue',
      borderWidth: 2,
      padding: 10,
      width: '100%',
      marginTop: 10,
      marginBottom: 10,
    },

    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '80%',
      marginTop: 10,
      marginBottom: 10
    },

    buttonWrapper: {
      flex: 1,
      marginHorizontal: 30,
      marginVertical: 10,
    },
  });