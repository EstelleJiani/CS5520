import { View, Text } from "react-native";
import React from "react";
import { auth } from "../Firebase/firebaseSetup";
import LocationMagager from "./LocationMagager";
import NotificationManager from "./NotificationManager";

export default function Profile() {
  const user = auth.currentUser;
  console.log(auth.currentUser);

  if (!user) {
    return (
      <View>
        <Text>No user logged in</Text>
      </View>
    );
  }
  
  return (
    <View>
      <Text>{user.email}</Text>
      <Text>{user.uid}</Text>
      <LocationMagager />
      <NotificationManager />
    </View>
  );
}