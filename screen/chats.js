import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { auth, db } from "../firebase";
import * as firebase from "firebase";

const Chats = ({ navigation, route }) => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    db.collection("rooms")
      .doc(route.params.chatId)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((message) => {
        setMessages(
          message.docs.map((single) => {
            return { id: single.id, data: single.data() };
          })
        );
      });
  }, [route]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.title,
      headerBackTitle: " ",
      headerRight: () => (
        <View style={styles.rightHead}>
          <TouchableOpacity activeOpacity={0.5}>
            <Ionicons name="videocam" color="white" size={24} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Ionicons name="call" color="white" size={24} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("rooms").doc(route.params.chatId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: msg,
      room: route.params.title,
      user: auth.currentUser.displayName,
      email: auth.currentUser.email,
    });
    setMsg("");
  };
  return (
    <KeyboardAvoidingView
      style={styles.parentDiv}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar />
      <FlatList
        data={messages}
        style={styles.container}
        inverted
        keyExtractor={(chat) => chat.id}
        renderItem={({ item }) => {
          return (
            <View
              style={[
                item.data.email === auth.currentUser.email
                  ? styles.selfContainer
                  : styles.notSelfContainer,
                styles.textContainer,
              ]}
            >
              <Text
                style={
                  item.data.email === auth.currentUser.email
                    ? styles.selfText
                    : styles.notSelfText
                }
              >
                {item.data.message}
              </Text>
            </View>
          );
        }}
      ></FlatList>
      <View style={styles.inputMessage}>
        <TextInput
          onSubmitEditing={sendMessage}
          style={styles.input}
          value={msg}
          onChangeText={(text) => setMsg(text)}
          placeholder="Send message"
        />
        <Button
          onPress={sendMessage}
          icon={<Ionicons name="send" size={24} color="white" />}
        />
      </View>
      <View style={{ height: 50 }} />
    </KeyboardAvoidingView>
  );
};

export default Chats;

const styles = StyleSheet.create({
  parentDiv: {
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  textContainer: {
    fontSize: 16,
    padding: 12,
    marginVertical: 2,
    borderRadius: 5,
  },
  selfContainer: {
    backgroundColor: "#3977f0",
    alignSelf: "flex-end",
    marginLeft: "auto",
    borderBottomRightRadius: 0,
  },
  notSelfContainer: {
    backgroundColor: "#ffffff",
    alignSelf: "flex-start",
    marginRight: "auto",
    borderBottomLeftRadius: 0,
  },
  selfText: {
    color: "#fff",
    paddingLeft: 16,
  },
  notSelfText: {
    color: "#000",
    paddingRight: 16,
  },
  rightHead: {
    marginRight: 15,
    display: "flex",
    flexDirection: "row",
    width: 70,
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderRadius: 10,
    width: "85%",
    padding: 10,
    marginRight: 5,
    backgroundColor: "#e2e2e2",
  },
  inputMessage: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 50,
  },
});
