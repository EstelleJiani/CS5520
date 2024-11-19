import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import * as Notifications from "expo-notifications";

export async function verifyPermission() {
  try {
    const response = await Notifications.getPermissionsAsync();

    if (response.granted) {
      return true;
    }
    const requestResponse = await Notifications.requestPermissionsAsync();
    return requestResponse.granted;
  } catch (err) {
    console.log("permission ", err);
  }
}

export default function NotificationManager() {
  const scheduleNotificationHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      console.log(hasPermission);
      await Notifications.scheduleNotificationAsync({
        content: { title: "First Notificaiton", body: "This is my first notification" },
        trigger: { seconds: 3 },
      });
    } catch (err) {
      console.log("schedule notification ", err);
    }
  }

  return (
    <View>
      <Button
        title="Remind me to add a goal"
        onPress={scheduleNotificationHandler}
      />
    </View>
  )
}

const styles = StyleSheet.create({})