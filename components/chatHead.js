import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

const ChatHead = ({ title, id, enterChat }) => {
  return (
    <ListItem onPress={() => enterChat(id, title)} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: "https://fiskl.com/wp-content/uploads/2019/11/avatar-300x300.jpg",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>{title}</ListItem.Title>
        <ListItem.Subtitle
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ fontSize: 14 }}
        >
          Vice Chairman
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default ChatHead;

const styles = StyleSheet.create({});
