import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState } from "react";
import { Platform } from "react-native";
import { KeyboardAvoidingView, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-elements";
import { db } from "../firebase";

const addChats = ({ navigation }) => {
  const [title, setTitle] = useState("");

  const addChat = async () => {
    db.collection("rooms")
      .add({
        title,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error.message));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: " ",
    });
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style="dark" />
      <TextInput
        style={styles.input}
        placeholder="Enter Chatroom name"
        autoFocus
        value={title}
        onSubmitEditing={addChat}
        onChangeText={(text) => setTitle(text)}
      />
      <Button onPress={addChat} style={styles.button} title="Create room" />
    </KeyboardAvoidingView>
  );
};

export default addChats;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
  },
  input: {
    width: 250,
    marginTop: 25,
    textAlign: "center",
    marginBottom: 10,
    fontSize: 18,
  },
  button: {
    fontSize: 14,
    paddingHorizontal: 45,
    marginTop: 15,
  },
});
