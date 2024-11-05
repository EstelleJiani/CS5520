import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { auth } from "../Firebase/firebaseSetup";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const loginHandler = () => {
    // navigate to Login page with no back button
    navigation.replace("Login");
  };
  const signupHandler = async () => {


    if (!email.length) {
      Alert.alert("email should not be empty");
      return;
    }
    if (!password.length) {
      Alert.alert("password should not be empty");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("password and confirm password should be the same");
      return;
    }
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCred);
    } catch (err) {
      console.log("create user ", err);
      // alert user based on the error message
      if (err.code === "auth/invalid-email") {
        Alert.alert("Email is invalid");
      } else if (err.code === "auth/missing-password") {
        Alert.alert("Password is missing");
      } else {
        Alert.alert(err.message);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(changedText) => {
          setEmail(changedText);
        }}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={(changedText) => {
          setPassword(changedText);
        }}
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(changedText) => {
          setConfirmPassword(changedText);
        }}
      />
      <Button title="Register" onPress={signupHandler} />
      <Button title="Already Registered? Login" onPress={loginHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "stretch",
    justifyContent: "center",
  },
  input: {
    borderColor: "#darkblue",
    borderWidth: 2,
    width: "80%",
    margin: 5,
    padding: 5,
  },
  label: {
    marginLeft: 10,
  },
});