import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { auth, db } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
import ChatHead from "../components/chatHead";

const Home = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    db.collection("rooms")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setChats(
          snapshot.docs.map((chat) => {
            const data = { id: chat.id, data: chat.data() };
            return data;
          })
        );
      });
  }, []);

  const signout = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  const enterChat = (chatId, title) => {
    navigation.navigate("Chat", {
      chatId,
      title,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "#f5f5f5" },
      headerTitleStyle: { color: "#000" },
      headerTintColor: "#000",
      headerLeft: () => (
        <View style={{ marginLeft: 15 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddChat")}
            activeOpacity={0.5}
          >
            <Ionicons name="ios-create-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{ marginRight: 15 }}>
          <Button type="clear" title="Logout" onPress={signout} />
        </View>
      ),
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map((single) => (
          <ChatHead
            enterChat={enterChat}
            title={single.data.title}
            id={single.id}
            key={single.id}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
